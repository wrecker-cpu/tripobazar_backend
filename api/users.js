// api/users.js

import userController from "../controllers/UserController";
import auth from "../auth/AuthValidation";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      if (req.url === "/User/login") {
        await userController.loginUser(req, res);
      } else {
        await userController.createUser(req, res);
      }
      break;
    case "GET":
      if (req.query.id) {
        await userController.getUserbyID(req, res);
      } else {
        // Protect and restrict route
        await auth.protect(req, res);
        await auth.restrictToAdmin(req, res);
        await userController.getAllUser(req, res);
      }
      break;
    case "PUT":
      await userController.updateUser(req, res);
      break;
    case "DELETE":
      await userController.deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

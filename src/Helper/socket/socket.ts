import { Socket } from "socket.io";

export const performSocketOpetaions = async (socket: Socket, user: any) => {
  try {
    if (!user) {
      socket.join("public");
      return;
    } else {
      if (user?.role == "ADMIN") {
        socket.join(["admin", "auth", "public"]);
        // console.log("Connected to room admin");
        return;
      } else {
        if (user?.username) {
          socket.join(["auth", "public"]);
          // console.log("Connected to room auth");
          return;
        }
      }
    }
  } catch {
    console.log("Error getting usernames");
  }
};

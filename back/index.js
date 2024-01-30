// require("dotenv").config;
// const { Server } = require("socket.io");
// const stripe = require("stripe")(
//   "sk_test_51Oa23kFgyHOf8MRLBiQ7NHVMbtwjQadZr4dQEePKGWzkjL5y1xpBDSD7COvLpuLiTXe5LQe3GUuQlEp7aF4Qf76l009Im1ojcX"
// );

// const express = require("express");
// const db = require("./database/index");
// const {
//   Bid,
//   Client,
//   Admin,
//   Items,
//   Memberships,
//   Seller,
//   Reclamation,
// } = require("./models/relations");
// const sellersRoutes = require("./routes/seller");
// const clientRoutes = require("./routes/client");
// const adminRoutes = require("./routes/admin");
// const dashboard = require("./routes/AdminDashboardRouter");
// const itemsRoute = require("./routes/itemsRoute");
// const cloudRoute = require("./routes/cloudinary");
// const cors = require("cors");
// const ProductsRouter = require("./routes/products");
// const sellerRouter = require("./routes/seller");
// const PaymentRouting = require("./routes/AdminPayemnt");
// const memRouter = require("./routes/memberships");

// const app = express();
// const userSocketMap = new Map();
// const corsOptions = {
//   origin: function (origin, callback) {
//     callback(null, true);
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.static(__dirname + "/../react-client/dist"));
// app.use(express.urlencoded({ extended: true }));
// const PORT = 5000;

// const storeItemMap = new Map();

// // Assume you have store items defined in some way, for example:
// storeItemMap.set("item1", { id: "item1", name: "basic", priceInDt: 100 });
// storeItemMap.set("item2", { id: "item2", name: "vip", priceInDt: 100 });
// storeItemMap.set("item3", { id: "item3", name: "basic", priceInDt: 100 });
// storeItemMap.set("item4", { id: "item4", name: "vip", priceInDt: 100 });

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { id, quantity } = req.body;

//     if (!id || !quantity) {
//       throw new Error("Invalid or missing items in the request body");
//     }

//     const storeItem = storeItemMap.get(id);

//     if (!storeItem) {
//       throw new Error(`Store item with id ${id} not found`);
//     }

//     const lineItems = [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: storeItem.name || "Unnamed Product",
//           },
//           unit_amount: storeItem.priceInDt || 0,
//         },
//         quantity: quantity || 1,
//       },
//     ];

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: lineItems,
//       success_url: `http://localhost:3000/secsess`, // Update with your frontend success URL
//       cancel_url: `http://localhost:3000/cancel`, // Update with your frontend cancel URL
//     });

//     // Handle the session object as needed (e.g., send it as a response)
//     res.json({ sessionId: session.id });
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).json({ error: e.message });
//   }
// });
// app.use("/membership", memRouter);
// app.use("/dash", dashboard);
// app.use("/seller", sellerRouter);
// app.use("/client", clientRoutes);
// app.use("/admin", adminRoutes);
// app.use("/products", ProductsRouter);
// app.use("/items", itemsRoute);
// app.use("/flousi", PaymentRouting);
// app.use("/cloudinary", cloudRoute);
// // Use the bid and the chat routes

// const chatRoutes = require("./routes/chatRoutes");
// const bidRouter = require("./routes/bidRouter")(app);

// app.use("/bid", bidRouter);
// app.use("/chat", chatRoutes);
// // End the Use the bid and the chat routes

// app.get("/getallusers", async (req, res) => {
//   let d = await Client.findAll();
//   let s = await Seller.findAll();
//   res.status(200).json({ total: d.length + s.length });
// });
// const server = app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });
// const io = new Server(server, {
//   cors: corsOptions,
// });

// app.use(cors(corsOptions));
// app.set("socketio", io);
// io.on("connection", (socket) => {
//   const userId = +socket.handshake.query.userId;
//   const itemsId = +socket.handshake.query.itemsId;
//   console.log(userId, itemsId);
//   userSocketMap.set(userId, socket);
//   console.log("User Connected ", userId);
//   console.log("userScoket", userSocketMap);

//   socket.on("create", function (room) {
//     console.log("room", room);

//     const rooms = Array.from(socket.rooms);

//     // Remove the default room from the list (if present)
//     const currentRoom = rooms.find((room) => room !== socket.id);

//     // Leave the current room if exists
//     if (currentRoom) {
//       socket.leave(currentRoom);
//       console.log("Left room: ", currentRoom);
//     }

//     // Join the new room
//     socket.join(room);
//   });
//   // Broadcasting to a specific room
//   io.to(roomId).emit("sendMessage", { text: "Hello, room!" });

//   // Broadcasting to a specific user
//   io.to(socketId).emit("sendMessage", { text: "Hello, user!" });

//   // Additional logic for chat
//   socket.on("sendMessage", (message) => {
//     console.log(message, "Message received");
//     socket.broadcast.emit("receiveMessage", message);
//   });
//   // Additional logic for bid
//   socket.on("placeBid", (message) => {
//     console.log(message, "messegeeeeee");
//     socket.broadcast.emit("placedBid", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected", userId);

//     // Get the list of rooms the user is currently in
//     const rooms = Array.from(socket.rooms);

//     // Remove the default room from the list (if present)
//     const currentRoom = rooms.find((room) => room !== socket.id);

//     if (currentRoom) {
//       socket.leave(currentRoom);
//       console.log("Left room: ", currentRoom);
//     }

//     userSocketMap.delete(userId);
//   });
// });
require("dotenv").config();
const { Server } = require("socket.io");
const stripe = require("stripe")(
  "sk_test_51Oa23kFgyHOf8MRLBiQ7NHVMbtwjQadZr4dQEePKGWzkjL5y1xpBDSD7COvLpuLiTXe5LQe3GUuQlEp7aF4Qf76l009Im1ojcX"
);

const express = require("express");
const db = require("./database/index");
const {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
} = require("./models/relations");
const sellersRoutes = require("./routes/seller");
const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");
const dashboard = require("./routes/AdminDashboardRouter");
const itemsRoute = require("./routes/itemsRoute");
const cloudRoute = require("./routes/cloudinary");
const cors = require("cors");
const ProductsRouter = require("./routes/products");
const sellerRouter = require("./routes/seller");
const PaymentRouting = require("./routes/AdminPayemnt");
const memRouter = require("./routes/memberships");

const app = express();
const userSocketMap = new Map();
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;

const storeItemMap = new Map();

// Assume you have store items defined in some way, for example:
storeItemMap.set("item1", { id: "item1", name: "basic", priceInDt: 100 });
storeItemMap.set("item2", { id: "item2", name: "vip", priceInDt: 100 });
storeItemMap.set("item3", { id: "item3", name: "basic", priceInDt: 100 });
storeItemMap.set("item4", { id: "item4", name: "vip", priceInDt: 100 });

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!id || !quantity) {
      throw new Error("Invalid or missing items in the request body");
    }

    const storeItem = storeItemMap.get(id);

    if (!storeItem) {
      throw new Error(`Store item with id ${id} not found`);
    }

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name || "Unnamed Product",
          },
          unit_amount: storeItem.priceInDt || 0,
        },
        quantity: quantity || 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:3000/secsess`, // Update with your frontend success URL
      cancel_url: `http://localhost:3000/cancel`, // Update with your frontend cancel URL
    });

    // Handle the session object as needed (e.g., send it as a response)
    res.json({ sessionId: session.id });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});
app.use("/membership", memRouter);
app.use("/dash", dashboard);
app.use("/seller", sellerRouter);
app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);
app.use("/products", ProductsRouter);
app.use("/items", itemsRoute);
app.use("/flousi", PaymentRouting);
app.use("/cloudinary", cloudRoute);
// Use the bid and the chat routes

const chatRoutes = require("./routes/chatRoutes");
const bidRouter = require("./routes/bidRouter")(app);

app.use("/bid", bidRouter);
app.use("/chat", chatRoutes);
// End the Use the bid and the chat routes

app.get("/getallusers", async (req, res) => {
  let d = await Client.findAll();
  let s = await Seller.findAll();
  res.status(200).json({ total: d.length + s.length });
});
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.set("socketio", io);
io.on("connection", (socket) => {
  const userId = +socket.handshake.query.userId;
  const itemsId = +socket.handshake.query.itemsId;
  console.log(userId, itemsId);
  userSocketMap.set(userId, socket);
  console.log("User Connected ", userId);
  console.log("userScoket", userSocketMap);

  socket.on("create", function (room) {
    console.log("room", room);

    const rooms = Array.from(socket.rooms);

    // Remove the default room from the list (if present)
    const currentRoom = rooms.find((room) => room !== socket.id);

    // Leave the current room if exists
    if (currentRoom) {
      socket.leave(currentRoom);
      console.log("Left room: ", currentRoom);
    }

    // Join the new room
    socket.join(room);
  });

  socket.on("sendMessage", (message) => {
    console.log(message, "Message received");

    // Determine the role of the sender (seller or client)
    const isSeller = message.isSeller;

    // Broadcast the message to all connected clients
    io.emit("receiveMessage", { text: message.text, isSeller: isSeller });
  });

  // Broadcasting to a specific room
  io.to(userId).emit("sendMessage", { text: "Hello, room!" });

  // Broadcasting to a specific user
  io.to(itemsId).emit("sendMessage", { text: "Hello, user!" });

  // Additional logic for chat
  socket.on("sendMessage", (message) => {
    console.log(message, "Message received");

    // Broadcast the message to all connected clients
    io.emit("receiveMessage", message);
  });

  // Additional logic for bid
  socket.on("placeBid", (message) => {
    console.log(message, "messegeeeeee");

    // Broadcast the bid to all connected clients
    io.emit("placedBid", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);

    // Get the list of rooms the user is currently in
    const rooms = Array.from(socket.rooms);

    // Remove the default room from the list (if present)
    const currentRoom = rooms.find((room) => room !== socket.id);

    if (currentRoom) {
      socket.leave(currentRoom);
      console.log("Left room: ", currentRoom);
    }

    userSocketMap.delete(userId);
  });
});

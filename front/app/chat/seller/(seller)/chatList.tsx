import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import { Avatar, Badge, Typography, avatar } from "@material-tailwind/react";
import { List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import "./css/scrollbar.css";
import { useChat } from "../chatContext";

const ChatList = ({ chats }) => {
  const { handleChatSelect } = useChat();
  console.log("handleChatSelect", handleChatSelect);
  console.log("chats", chats);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnectivityChange = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", handleConnectivityChange);
    window.addEventListener("offline", handleConnectivityChange);

    return () => {
      window.removeEventListener("online", handleConnectivityChange);
      window.removeEventListener("offline", handleConnectivityChange);
    };
  }, []);

  // const chats = [
  //   {
  //     id: 1,
  //     name: "zaki zakou",
  //     avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Kina Mayer",
  //     avatar:
  //       "https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "salmen khelifi",
  //     avatar:
  //       "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "salim ben selim ",
  //     avatar:
  //       "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
  //   },
  //   { id: 5, name: "salah hlel ", avatar: "" },
  //   { id: 6, name: "adib ", avatar: "" },
  //   { id: 7, name: "Kina Mayer", avatar: "" },
  //   { id: 8, name: "salmen khelifi", avatar: "" },
  //   { id: 9, name: "salim ben selim ", avatar: "" },
  //   { id: 10, name: "salah hlel ", avatar: "" },
  //   { id: 11, name: "adib ", avatar: "" },
  // ];
  return (
    <div className="w-1/4 p-4 border-r bg-gray-100 ">
      <div className="flex items-center gap-4 mb-4">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
        <div>
          <Typography variant="h6 " className="text-xl font-bold  ">
            Khelifi salmen
          </Typography>{" "}
          <Typography variant="h6 " className="text-sm font-bold  ">
            Web Developer{" "}
          </Typography>
        </div>
      </div>{" "}
      <SearchBar />
      <ul className="overflow-y-scroll h-[79vh]">
        {" "}
        {/* Set height to 100% */}
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`flex cursor-pointer hover:bg-gray-200   text-black p-1 rounded-md  ${
              isConnected ? "border-green-500" : "border-red-500"
            }`}
            onClick={() => handleChatSelect(chat)}
          >
            <ListWithAvatar name={chat.name} image={chat.image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ListWithAvatar = ({ name, image }) => (
  <Card className="w-96">
    <List className="pt-0 pb-0">
      <ListItem className="">
        <ListItemPrefix>
          <Avatar variant="circular" alt={name} src={image} />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            {name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Online
          </Typography>
        </div>
      </ListItem>
    </List>
  </Card>
);

export default ChatList;

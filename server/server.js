// server.js

const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on("connection", (socket) => {
  // 当有新的客户端连接时

  // 从文本文件中读取数据
  // 这里可以根据你的需求进行修改，比如从数据库中读取数据
  const textData = ["新的文本1"];

  // 发送文本数据给客户端
  socket.emit("textData", textData);

  // 模拟每隔一段时间发送新的文本数据
  setInterval(() => {
    const newText = "新的文本" + (textData.length + 1);
    textData.unshift(newText); // 将新的文本添加到数组的开头
    socket.emit("textData", textData);
  }, 5000);
});

server.listen(3000, () => {
  console.log("WebSocket服务器已启动，监听端口3000");
});

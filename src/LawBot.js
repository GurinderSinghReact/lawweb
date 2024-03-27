import React, { useEffect, useRef, useState } from "react";
import { List, Typography, Input, Space, Button, Spin } from "antd";
import { BASE_URL } from "./constants";

function LawBot() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thread_id, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = () => {
    const tempMsg = [...messages];
    tempMsg.push({ id: Math.random(), by: "me", msg: query });
    setMessages(tempMsg);
    const tempInquiry = query;
    setQuery("");
    if (tempInquiry) {
      setIsLoading(true);
      fetch(BASE_URL + `criminalslaws/api/v1/crlaw/chatbot/query`, {
        method: "post",
        body: JSON.stringify({
          query: tempInquiry,
          thread_id: thread_id,
        }),
        headers: {
          Taxmannauthorization:
            "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjY5ODAyMiIsImVtYWlsSWQiOiJzYW5qZWV0LjlAZ21haWwuY29tIiwibW9iaWxlIjoiOTU2MDA1NTg0MyIsImZpcnN0TmFtZSI6IlNhbmplZXQiLCJsYXN0TmFtZSI6InJ3bHR6YSIsImRlc2lnbmF0aW9uIjoiQVNTSVNUQU5UIEdFTkVSQUwgTUFOQUdFUiAtIEFDQ09VTlRTIiwidXNlcklEIjoiNjk4MDIyIiwic2VjcmV0QWNjZXNzQ29kZSI6IiIsInRpbWVTdGFtcCI6MTcwODQxNzgzNTEyNywibmJmIjoxNzA4NDE3ODM1LCJleHAiOjE3MTEwMDk4MzUsImlhdCI6MTcwODQxNzgzNSwiaXNzIjoiMmJiZTVkZTQtMmQ1YS00ODg0LTk0Y2UtZmI2YTU5ODE2YjNmIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2NDA2NC8ifQ.3sPjSey0tnl4h7OrvVLP2wjOFqacY5lfOQTwsYavRHY",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data?.Data.length > 1 && !thread_id) {
            setThreadId(data?.Data[1]);
          }
          tempMsg.push({ id: Math.random(), by: "lawbot", msg: data?.Data[0] });
          setMessages([...tempMsg]);
          console.log(data, "response from api");
        })
        .catch((err) => {
          tempMsg.push({
            id: Math.random(),
            by: "lawbot",
            msg: "Sorry didn't get you",
          });
          setMessages([...tempMsg]);
          console.log(err, "error from api");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const { Text } = Typography;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "92vh" }}>
      <h3 style={{ marginBottom: 16 }}>Welcome to Law Bot</h3>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <List
          header={null}
          footer={null}
          bordered
          dataSource={messages}
          renderItem={(item) => {
            if (item?.by === "lawbot") {
              return (
                <List.Item>
                  {/* <Typography> */}
                  <pre>
                  <div dangerouslySetInnerHTML={{ __html: item?.msg }} />
                  </pre>
                  {/* </Typography> */}
                </List.Item>
              );
            } else {
              return (
                <List.Item>
                  <pre>
                    <div dangerouslySetInnerHTML={{ __html: item?.msg }} />
                  </pre>
                </List.Item>
              );
            }
          }}
        />
        <div ref={messagesEndRef} />
        {isLoading && <Spin style={{ marginLeft: "10px" }} />}
      </div>
      {/* <Space direction="vertical" size="middle"> */}
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Message LawBot"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          onPressEnter={onSubmit}
          disabled={isLoading}
        />
        <Button type="primary" onClick={onSubmit} disabled={isLoading}>
          Submit
        </Button>
      </Space.Compact>
      {/* </Space> */}
    </div>
  );
}

export default LawBot;

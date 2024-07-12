import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MessageGroupPage.css";

import DesktopNavigation from "../components/DesktopNavigation";
import MessagesFeed from "../components/MessageFeed";
import MessagesForm from "../components/MessageForm";
import MessageGroupFeed from "../components/MessageGroupFeed";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function MessageGroupPage() {
  const [messageGroups, setMessageGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [popped, setPopped] = useState([]);
  const params = useParams();

  const user = useAuth();
  const message_groups_backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/message_groups`;
  const handle = `@${params.handle}`;
  const messages_backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/messages/${handle}`;

  const { data: fetchedMesssageGroups } = useFetch(message_groups_backend_url);

  const { data: fetchedMessages } = useFetch(messages_backend_url);

  useEffect(() => {
    if (fetchedMesssageGroups) {
      setMessageGroups(fetchedMesssageGroups);
    }

    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMesssageGroups, fetchedMessages]);

  return (
    <article>
      <DesktopNavigation user={user} active={"home"} setPopped={setPopped} />
      <section className="message_groups">
        <MessageGroupFeed message_groups={messageGroups} />
      </section>
      <div className="content messages">
        <MessagesFeed messages={messages} />
        <MessagesForm setMessages={setMessages} />
      </div>
    </article>
  );
}

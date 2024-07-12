import React, { useEffect, useState } from "react";
import "./MessageGroupsPage.css";

import DesktopNavigation from "../components/DesktopNavigation";
import MessageGroupFeed from "../components/MessageGroupFeed";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function MessageGroupsPage() {
  const [messageGroups, setMessageGroups] = useState([]);
  const [popped, setPopped] = useState([]);
  const user = useAuth();
  const message_groups_backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/message_groups`;

  const { data: fetchedMesssageGroups } = useFetch(message_groups_backend_url);

  useEffect(() => {
    if (fetchedMesssageGroups) {
      setMessageGroups(fetchedMesssageGroups);
    }
  }, [fetchedMesssageGroups]);

  return (
    <article>
      <DesktopNavigation user={user} active={"home"} setPopped={setPopped} />
      <section className="message_groups">
        <MessageGroupFeed message_groups={messageGroups} />
      </section>
      <div className="content"></div>
    </article>
  );
}

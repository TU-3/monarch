import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { H1, H2, H3, H4, H5, H6, P, SmallText, Subtitle } from "@/components/typography";

type User = { id: number; email: string /*…other fields*/ };

function OrgDashboard() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_PROXY_URL + "api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <>
      <div>
        <h1>Users</h1>
        {users.map((u) => (
          <div key={u.id}>{u.email}</div>
        ))}
      </div>

      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>

      <section id="typography-examples-delete-later" className="">
        <H1>Typography Examples</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
        <P>Paragraph</P>
        <SmallText>Small Text</SmallText>
        <Subtitle>Subtitle</Subtitle>
      </section>
    </>
  );
}

export default OrgDashboard;

export default async function handler(req, res) {
   if (req.method === "POST") {
      try {
         const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify({
               email: req.body.email,
               password: req.body.password,
            }),
         });

         const data = await response.json();
         console.log(data);
         if (response.ok) {
            res.status(200).json({ user: data.user });
         } else {
            res.status(response.status).json({ message: data });
         }
      } catch (e) {
         console.log(e.message);
         res.status(500).json({ message: { err: ["Server Error"] } });
      }
   } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
   }
}

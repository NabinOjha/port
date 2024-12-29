import { apiPost, apiGet } from "../database";

export async function GET(req: Request, res: Response) {
  const query = `
    SELECT * from blogs
  `;

  let status, body;
  try {
    await apiGet(query)
      .then((res) => {
        status = 200;
        body = res;
      })
      .catch((err: Error) => {
        status = 400;
        body = { error: err };
      });
    return Response.json(body, {
      status,
    });
  } catch (error: any) {
    console.error(error.message);
    return Response.json(
      { error: error },
      {
        status: 400,
      }
    );
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { name, description, slug }  = body;

  console.log({name, description, slug})

  const query = `
      INSERT INTO blogs(name, description, slug)
      VALUES(${name}, ${description}, ${slug})
    `;;

  let status, respBody;
  await apiPost(query)
    .then(() => {
      status = 200;
      respBody = { message: "Successfully created blog" };
    })
    .catch((err) => {
      status = 400;
      respBody = err;
    });
  return Response.json(respBody, {
    status,
  });
}

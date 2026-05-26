export async function POST(req) {
    const body = await req.json()

    console.log("User Data:", body);

    return Response.json({
        success: true,
        message: "login success"
    })
}
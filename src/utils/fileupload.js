"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";
const fs = require("fs");

export const fileUploadhandler = async (formData) => {
  const headersList = await headers();

  const file = formData.get("files");
  const dir = "public/static/images/";

  if (!file) {
    return { message: "Please upload a file" };
  }

  const domain_name = headersList.get("origin");

  console.log(domain_name, "Testing domain");

  console.log(domain_name);
  //check if directory is available if not create it.
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  //Starting upload process
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(path.join(process.cwd(), dir + filename), buffer);
    revalidatePath("/");
    // Return a JSON response with a success message and a 201 status code

    return {
      status: true,
      img_url: `${domain_name}/our-fellows/static/images/${filename}`,
      name: filename,
    };
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    return { status: false, message: "Unable to upload picture" };
    // return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

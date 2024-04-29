import { useState, useEffect } from "react";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";

const client = new S3Client({
  region: "af-south-1",
  credentials: {
    accessKeyId: config.s3AccessKey,
    secretAccessKey: config.s3SecretKey,
  },
});

export const BUCKET = "unique-profile-images";

export const useMediaStorage = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [key, setKey] = useState("");
  const [body, setBody] = useState("");
  const [operation, setOperation] = useState("");

  const retrieve = async (key) => {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
      });
      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      setResponse({ url });
      return url;
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (operation !== "retrieve") return;
    retrieve();
  }, [operation]);

  useEffect(() => {
    if (operation !== "store") return;

    const store = async () => {
      try {
        const command = new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: body,
        });
        const result = await client.send(command);
        setResponse(result);
        setLink(`https://${BUCKET}.s3.af-south-1.amazonaws.com/${key}`);
      } catch (err) {
        setError(err);
      }
    };
    store();
  }, [operation]);

  const storeItem = (key, body) => {
    setKey(key);
    setBody(body);
    setOperation("store");
  };

  return {
    store: storeItem,
    link,
    retrieve,
    error,
    response,
  };
};

import { useEffect, useState } from "react";
import configs from "../configs";
import useLocalStorage from "./useLocalStorage";

const useUrl = () => {
  const { stayToken } = useLocalStorage();
  const [urlList, setUrlList] = useState([]);
  const [addUrl, setAddUrl] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");

  /**
   * Get all urls
   */
  useEffect(() => {
    fetch(`${configs.serverUrl}/api/urls`, {
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        //   If error occurred to the server
        if (!success) {
          return;
        }
        setUrlList((urlList) => [...urlList, ...data]);
      });
  }, [stayToken]);

  /**
   * Create new url
   */
  useEffect(() => {
    if (!addUrl) {
      return;
    }

    fetch(`${configs.serverUrl}/api/add-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        label: addUrl.label,
        url: addUrl.url,
      }),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          setUrlList((urlList) => [...urlList, { ...data }]);
        }
      });

    setAddUrl("");
  }, [addUrl, stayToken]);

  /**
   * Delete url by id
   */
  useEffect(() => {
    if (!deleteUrl) {
      return;
    }

    fetch(`${configs.serverUrl}/api/delete-url?urlId=${deleteUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          const newUrlList = urlList.filter(({ _id }) => _id !== data._id);
          setUrlList(newUrlList);
        }
      });

    setDeleteUrl("");
  }, [stayToken, urlList, deleteUrl]);

  return { urlList, setAddUrl, setDeleteUrl };
};

export default useUrl;

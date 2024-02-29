import React from "react";
import { headers } from "next/headers";
import Markdown from "react-markdown";

const page = async () => {
  const host = headers().get("host");
  // テーブルデータの取得
  const responseTableData = await fetch(`http://${host}/api/notion`);
  const tableData = await responseTableData.json();

  // ページデータの取得
  const detailId = "aifhaifhaie;hfaiehfae;hfae"; //ページID(テーブルを取得する際にメタデータとしてidが得られる
  const responsePageData = await fetch(`http://${host}/api/notion/${detailId}`);
  const pageData = await responsePageData.json();

  return (
    <div>
      ﬁ<h1>Notion API Test</h1>
      <h2>Table Data</h2>
      <pre>{JSON.stringify(tableData, null, 2)}</pre>
      <Markdown>{pageData}</Markdown>
    </div>
  );
};

export default page;

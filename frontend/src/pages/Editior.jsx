import React, { useEffect, useState } from "react";
import EditiorNavbar from "../componenets/EditiorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");
  const [isMdScreen, setIsMdScreen] = useState(false);

useEffect(() => {
  const checkScreenSize = () => {
    setIsMdScreen(window.innerWidth >= 768);
  };

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  return () => window.removeEventListener("resize", checkScreenSize);
}, []);


  const { projectID } = useParams();

  const changeTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditiorNavbar
        projectID={projectID}
        htmlCode={htmlCode}
        cssCode={cssCode}
        jsCode={jsCode}
      />
      <div className="flex flex-col md:flex-row">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"} bg-[#1A1919]`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setTab("html")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                JavaScript
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i
                className="text-[20px] cursor-pointer text-white"
                onClick={changeTheme}
              >
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer text-white"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>

          {tab === "html" ? (
            <Editor
              onChange={(value) => {
                setHtmlCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
              width={isMdScreen ? "" : "100vw"}
            />
          ) : tab === "css" ? (
            <Editor
              onChange={(value) => {
                setCssCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
              width={isMdScreen ? "" : "100vw"}
            />
          ) : (
            <Editor
              onChange={(value) => {
                setJsCode(value || "");
                run();
              }}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
              width={isMdScreen ? "" : "100vw"}
            />
          )}
        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-[100%] mt-4 md:w-[50%] md:mt-0 min-h-[82vh] bg-[#fff] text-black"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default Editior;

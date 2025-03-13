// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: d1S8dWKKr4PVKg3azHqMAd
// Component: TTtT2m4PE29g
import * as React from "react";
import { useRouter } from "next/router";
import {
  PlasmicImg as PlasmicImg__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  get as $stateGet,
  set as $stateSet,
  useDollarState
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";
import "@plasmicapp/react-web/lib/plasmic.css";
import plasmic_antd_5_hostless_css from "../antd_5_hostless/plasmic.module.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: d1S8dWKKr4PVKg3azHqMAd/projectcss
import sty from "./PlasmicFriendComonent.module.css"; // plasmic-import: TTtT2m4PE29g/css

createPlasmicElementProxy;

export const PlasmicFriendComonent__VariantProps = new Array();

export const PlasmicFriendComonent__ArgProps = new Array(
  "currentItem",
  "garbageHover",
  "onGarbageHoverChange"
);

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicFriendComonent__RenderFunc(props) {
  const { variants, overrides, forNode } = props;
  const args = React.useMemo(
    () =>
      Object.assign(
        {},
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );
  const $props = {
    ...args,
    ...variants
  };
  const __nextRouter = useNextRouter();
  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;
  const stateSpecs = React.useMemo(
    () => [
      {
        path: "garbageHover",
        type: "writable",
        variableType: "boolean",
        valueProp: "garbageHover",
        onChangeProp: "onGarbageHoverChange"
      }
    ],

    [$props, $ctx, $refs]
  );
  const $state = useDollarState(stateSpecs, {
    $props,
    $ctx,
    $queries: {},
    $refs
  });
  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_antd_5_hostless_css.plasmic_tokens,
        sty.root
      )}
      onClick={async event => {
        const $steps = {};
        $steps["goToPage"] = true
          ? (() => {
              const actionArgs = {
                destination: (() => {
                  try {
                    return (
                      "/friends-details?friendId=" +
                      $props.currentItem.friend_name +
                      "&username=" +
                      $ctx.query.username
                    );
                  } catch (e) {
                    if (
                      e instanceof TypeError ||
                      e?.plasmicType === "PlasmicUndefinedDataError"
                    ) {
                      return `/friends-details`;
                    }
                    throw e;
                  }
                })()
              };
              return (({ destination }) => {
                if (
                  typeof destination === "string" &&
                  destination.startsWith("#")
                ) {
                  document
                    .getElementById(destination.substr(1))
                    .scrollIntoView({ behavior: "smooth" });
                } else {
                  __nextRouter?.push(destination);
                }
              })?.apply(null, [actionArgs]);
            })()
          : undefined;
        if (
          $steps["goToPage"] != null &&
          typeof $steps["goToPage"] === "object" &&
          typeof $steps["goToPage"].then === "function"
        ) {
          $steps["goToPage"] = await $steps["goToPage"];
        }
      }}
      onMouseEnter={async event => {
        const $steps = {};
        $steps["updateGarbageHover"] = true
          ? (() => {
              const actionArgs = {
                variable: {
                  objRoot: $state,
                  variablePath: ["garbageHover"]
                },
                operation: 4
              };
              return (({ variable, value, startIndex, deleteCount }) => {
                if (!variable) {
                  return;
                }
                const { objRoot, variablePath } = variable;
                const oldValue = $stateGet(objRoot, variablePath);
                $stateSet(objRoot, variablePath, !oldValue);
                return !oldValue;
              })?.apply(null, [actionArgs]);
            })()
          : undefined;
        if (
          $steps["updateGarbageHover"] != null &&
          typeof $steps["updateGarbageHover"] === "object" &&
          typeof $steps["updateGarbageHover"].then === "function"
        ) {
          $steps["updateGarbageHover"] = await $steps["updateGarbageHover"];
        }
      }}
      onMouseLeave={async event => {
        const $steps = {};
        $steps["updateGarbageHover"] = true
          ? (() => {
              const actionArgs = {
                variable: {
                  objRoot: $state,
                  variablePath: ["garbageHover"]
                },
                operation: 4
              };
              return (({ variable, value, startIndex, deleteCount }) => {
                if (!variable) {
                  return;
                }
                const { objRoot, variablePath } = variable;
                const oldValue = $stateGet(objRoot, variablePath);
                $stateSet(objRoot, variablePath, !oldValue);
                return !oldValue;
              })?.apply(null, [actionArgs]);
            })()
          : undefined;
        if (
          $steps["updateGarbageHover"] != null &&
          typeof $steps["updateGarbageHover"] === "object" &&
          typeof $steps["updateGarbageHover"].then === "function"
        ) {
          $steps["updateGarbageHover"] = await $steps["updateGarbageHover"];
        }
      }}
    >
      <PlasmicImg__
        alt={""}
        className={classNames(sty.img__lyQN)}
        displayHeight={"auto"}
        displayMaxHeight={"none"}
        displayMaxWidth={"100%"}
        displayMinHeight={"0"}
        displayMinWidth={"0"}
        displayWidth={"70px"}
        loading={"lazy"}
        src={{
          src: "/plasmic/friendo/images/icons8ProfilePicture96Png.png",
          fullWidth: 96,
          fullHeight: 96,
          aspectRatio: undefined
        }}
      />

      <div
        data-plasmic-name={"text"}
        data-plasmic-override={overrides.text}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.text)}
      >
        <React.Fragment>
          {(() => {
            try {
              return $props.currentItem.friend_name;
            } catch (e) {
              if (
                e instanceof TypeError ||
                e?.plasmicType === "PlasmicUndefinedDataError"
              ) {
                return " ";
              }
              throw e;
            }
          })()}
        </React.Fragment>
      </div>
      {(() => {
        try {
          return $state.garbageHover;
        } catch (e) {
          if (
            e instanceof TypeError ||
            e?.plasmicType === "PlasmicUndefinedDataError"
          ) {
            return true;
          }
          throw e;
        }
      })() ? (
        <PlasmicImg__
          alt={""}
          className={classNames(sty.img__z4YRz)}
          displayHeight={"20px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"20px"}
          loading={"lazy"}
          onClick={async event => {
            const $steps = {};
            $steps["runCode"] = true
              ? (() => {
                  const actionArgs = {
                    customFunction: async () => {
                      return (async () => {
                        const friend_name =
                          $props.currentItem.friend_name?.valueOf || "";
                        const token = $ctx.query.username || "";
                        async function fetchData() {
                          const API_URL =
                            "http://127.0.0.1:8000/deletefriends/";
                          const requestData = {
                            token: token,
                            friend_name: friend_name
                          };
                          console.log(requestData);
                          try {
                            const response = await fetch(API_URL, {
                              method: "delete",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(requestData)
                            });
                          } catch (error) {
                            console.error("Error fetching API:", error);
                          }
                        }
                        return fetchData();
                      })();
                    }
                  };
                  return (({ customFunction }) => {
                    return customFunction();
                  })?.apply(null, [actionArgs]);
                })()
              : undefined;
            if (
              $steps["runCode"] != null &&
              typeof $steps["runCode"] === "object" &&
              typeof $steps["runCode"].then === "function"
            ) {
              $steps["runCode"] = await $steps["runCode"];
            }
          }}
          src={{
            src: "/plasmic/friendo/images/icons8Trash501Png.png",
            fullWidth: 50,
            fullHeight: 50,
            aspectRatio: undefined
          }}
        />
      ) : null}
    </div>
  );
}

const PlasmicDescendants = {
  root: ["root", "text"],
  text: ["text"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicFriendComonent__ArgProps,
          internalVariantPropNames: PlasmicFriendComonent__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicFriendComonent__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicFriendComonent";
  } else {
    func.displayName = `PlasmicFriendComonent.${nodeName}`;
  }
  return func;
}

export const PlasmicFriendComonent = Object.assign(
  // Top-level PlasmicFriendComonent renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    text: makeNodeComponent("text"),
    // Metadata about props expected for PlasmicFriendComonent
    internalVariantProps: PlasmicFriendComonent__VariantProps,
    internalArgProps: PlasmicFriendComonent__ArgProps
  }
);

export default PlasmicFriendComonent;
/* prettier-ignore-end */

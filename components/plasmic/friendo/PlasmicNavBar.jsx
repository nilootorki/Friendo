// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: d1S8dWKKr4PVKg3azHqMAd
// Component: KnagBLotfm8n
import * as React from "react";
import { useRouter } from "next/router";
import {
  PlasmicImg as PlasmicImg__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  get as $stateGet,
  hasVariant,
  set as $stateSet,
  useDollarState
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";
import { useScreenVariants as useScreenVariantss47GOinckgZx } from "./PlasmicGlobalVariant__Screen"; // plasmic-import: s47GOinckgZX/globalVariant
import "@plasmicapp/react-web/lib/plasmic.css";
import plasmic_antd_5_hostless_css from "../antd_5_hostless/plasmic.module.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: d1S8dWKKr4PVKg3azHqMAd/projectcss
import sty from "./PlasmicNavBar.module.css"; // plasmic-import: KnagBLotfm8n/css

createPlasmicElementProxy;

export const PlasmicNavBar__VariantProps = new Array();

export const PlasmicNavBar__ArgProps = new Array(
  "proTooltip",
  "onProTooltipChange",
  "statTooltip",
  "onStatTooltipChange",
  "caltooltip",
  "onCaltooltipChange",
  "messTooltip",
  "onMessTooltipChange",
  "friendsTooltip",
  "onFriendsTooltipChange"
);

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicNavBar__RenderFunc(props) {
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
        path: "proTooltip",
        type: "writable",
        variableType: "boolean",
        valueProp: "proTooltip",
        onChangeProp: "onProTooltipChange"
      },
      {
        path: "statTooltip",
        type: "writable",
        variableType: "boolean",
        valueProp: "statTooltip",
        onChangeProp: "onStatTooltipChange"
      },
      {
        path: "caltooltip",
        type: "writable",
        variableType: "boolean",
        valueProp: "caltooltip",
        onChangeProp: "onCaltooltipChange"
      },
      {
        path: "messTooltip",
        type: "writable",
        variableType: "boolean",
        valueProp: "messTooltip",
        onChangeProp: "onMessTooltipChange"
      },
      {
        path: "friendsTooltip",
        type: "writable",
        variableType: "boolean",
        valueProp: "friendsTooltip",
        onChangeProp: "onFriendsTooltipChange"
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
  const globalVariants = ensureGlobalVariants({
    screen: useScreenVariantss47GOinckgZx()
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
    >
      <div className={classNames(projectcss.all, sty.freeBox__nmmXu)}>
        <PlasmicImg__
          alt={""}
          className={classNames(sty.img__bd2Jw)}
          displayHeight={"52px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"300px"}
          loading={"lazy"}
          src={{
            src: "/plasmic/friendo/images/sketch1741507911746Png.png",
            fullWidth: 1272,
            fullHeight: 1447,
            aspectRatio: undefined
          }}
        />
      </div>
      <div className={classNames(projectcss.all, sty.freeBox__pzFTs)}>
        <div
          className={classNames(projectcss.all, sty.freeBox__hSiP0)}
          onClick={async event => {
            const $steps = {};
            $steps["goToProfileEdit"] = true
              ? (() => {
                  const actionArgs = { destination: `/profile-edit` };
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
              $steps["goToProfileEdit"] != null &&
              typeof $steps["goToProfileEdit"] === "object" &&
              typeof $steps["goToProfileEdit"].then === "function"
            ) {
              $steps["goToProfileEdit"] = await $steps["goToProfileEdit"];
            }
          }}
          onMouseEnter={async event => {
            const $steps = {};
            $steps["updateProTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["proTooltip"]
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
              $steps["updateProTooltip"] != null &&
              typeof $steps["updateProTooltip"] === "object" &&
              typeof $steps["updateProTooltip"].then === "function"
            ) {
              $steps["updateProTooltip"] = await $steps["updateProTooltip"];
            }
          }}
          onMouseLeave={async event => {
            const $steps = {};
            $steps["updateProTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["proTooltip"]
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
              $steps["updateProTooltip"] != null &&
              typeof $steps["updateProTooltip"] === "object" &&
              typeof $steps["updateProTooltip"].then === "function"
            ) {
              $steps["updateProTooltip"] = await $steps["updateProTooltip"];
            }
          }}
        >
          <PlasmicImg__
            alt={""}
            className={classNames(sty.img__wOl57)}
            displayHeight={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "40px"
                : "40px"
            }
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "40px"
                : "40px"
            }
            loading={"lazy"}
            src={{
              src: "/plasmic/friendo/images/icons8Customer64Png.png",
              fullWidth: 64,
              fullHeight: 64,
              aspectRatio: undefined
            }}
          />

          {(() => {
            try {
              return $state.proTooltip;
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
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__wd2D0
              )}
            >
              {"Edit Profile"}
            </div>
          ) : null}
        </div>
        <div
          className={classNames(projectcss.all, sty.freeBox__zmy9O)}
          onMouseEnter={async event => {
            const $steps = {};
            $steps["updateStatTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["statTooltip"]
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
              $steps["updateStatTooltip"] != null &&
              typeof $steps["updateStatTooltip"] === "object" &&
              typeof $steps["updateStatTooltip"].then === "function"
            ) {
              $steps["updateStatTooltip"] = await $steps["updateStatTooltip"];
            }
          }}
          onMouseLeave={async event => {
            const $steps = {};
            $steps["updateStatTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["statTooltip"]
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
              $steps["updateStatTooltip"] != null &&
              typeof $steps["updateStatTooltip"] === "object" &&
              typeof $steps["updateStatTooltip"].then === "function"
            ) {
              $steps["updateStatTooltip"] = await $steps["updateStatTooltip"];
            }
          }}
        >
          <PlasmicImg__
            alt={""}
            className={classNames(sty.img__f62Im)}
            displayHeight={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "30px"
                : "25px"
            }
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "30px"
                : "25px"
            }
            loading={"lazy"}
            src={{
              src: "/plasmic/friendo/images/icons8Statistics50Png.png",
              fullWidth: 50,
              fullHeight: 50,
              aspectRatio: undefined
            }}
          />

          {(() => {
            try {
              return $state.statTooltip;
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
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__sqXno
              )}
            >
              {"See Statistics"}
            </div>
          ) : null}
        </div>
        <div
          className={classNames(projectcss.all, sty.freeBox__gPu4)}
          onClick={async event => {
            const $steps = {};
            $steps["goToCallHistory"] = true
              ? (() => {
                  const actionArgs = { destination: `/call-history` };
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
              $steps["goToCallHistory"] != null &&
              typeof $steps["goToCallHistory"] === "object" &&
              typeof $steps["goToCallHistory"].then === "function"
            ) {
              $steps["goToCallHistory"] = await $steps["goToCallHistory"];
            }
          }}
          onMouseEnter={async event => {
            const $steps = {};
            $steps["updateCaltooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["caltooltip"]
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
              $steps["updateCaltooltip"] != null &&
              typeof $steps["updateCaltooltip"] === "object" &&
              typeof $steps["updateCaltooltip"].then === "function"
            ) {
              $steps["updateCaltooltip"] = await $steps["updateCaltooltip"];
            }
          }}
          onMouseLeave={async event => {
            const $steps = {};
            $steps["updateCaltooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["caltooltip"]
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
              $steps["updateCaltooltip"] != null &&
              typeof $steps["updateCaltooltip"] === "object" &&
              typeof $steps["updateCaltooltip"].then === "function"
            ) {
              $steps["updateCaltooltip"] = await $steps["updateCaltooltip"];
            }
          }}
        >
          <PlasmicImg__
            alt={""}
            className={classNames(sty.img___2IiOt)}
            displayHeight={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "35px"
                : "30px"
            }
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "35px"
                : "30px"
            }
            loading={"lazy"}
            src={{
              src: "/plasmic/friendo/images/icons8Call48Png.png",
              fullWidth: 48,
              fullHeight: 48,
              aspectRatio: undefined
            }}
          />

          {(() => {
            try {
              return $state.caltooltip;
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
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__wpMrs
              )}
            >
              {"Call History"}
            </div>
          ) : null}
        </div>
        <div
          className={classNames(projectcss.all, sty.freeBox__bOGs)}
          onMouseEnter={async event => {
            const $steps = {};
            $steps["updateMessTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["messTooltip"]
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
              $steps["updateMessTooltip"] != null &&
              typeof $steps["updateMessTooltip"] === "object" &&
              typeof $steps["updateMessTooltip"].then === "function"
            ) {
              $steps["updateMessTooltip"] = await $steps["updateMessTooltip"];
            }
          }}
          onMouseLeave={async event => {
            const $steps = {};
            $steps["updateMessTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["messTooltip"]
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
              $steps["updateMessTooltip"] != null &&
              typeof $steps["updateMessTooltip"] === "object" &&
              typeof $steps["updateMessTooltip"].then === "function"
            ) {
              $steps["updateMessTooltip"] = await $steps["updateMessTooltip"];
            }
          }}
        >
          <PlasmicImg__
            alt={""}
            className={classNames(sty.img__njWcS)}
            displayHeight={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "35px"
                : "30px"
            }
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={
              hasVariant(globalVariants, "screen", "mobileOnly")
                ? "35px"
                : "30px"
            }
            loading={"lazy"}
            src={{
              src: "/plasmic/friendo/images/icons8Messages48Png.png",
              fullWidth: 48,
              fullHeight: 48,
              aspectRatio: undefined
            }}
          />

          {(() => {
            try {
              return $state.messTooltip;
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
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__jjFui
              )}
            >
              {"Message History"}
            </div>
          ) : null}
        </div>
        <div
          className={classNames(projectcss.all, sty.freeBox__bGuJ)}
          onClick={async event => {
            const $steps = {};
            $steps["goToFriendsPage"] = true
              ? (() => {
                  const actionArgs = { destination: `/friends-page` };
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
              $steps["goToFriendsPage"] != null &&
              typeof $steps["goToFriendsPage"] === "object" &&
              typeof $steps["goToFriendsPage"].then === "function"
            ) {
              $steps["goToFriendsPage"] = await $steps["goToFriendsPage"];
            }
          }}
          onMouseEnter={async event => {
            const $steps = {};
            $steps["updateFriendsTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["friendsTooltip"]
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
              $steps["updateFriendsTooltip"] != null &&
              typeof $steps["updateFriendsTooltip"] === "object" &&
              typeof $steps["updateFriendsTooltip"].then === "function"
            ) {
              $steps["updateFriendsTooltip"] = await $steps[
                "updateFriendsTooltip"
              ];
            }
          }}
          onMouseLeave={async event => {
            const $steps = {};
            $steps["updateFriendsTooltip"] = true
              ? (() => {
                  const actionArgs = {
                    variable: {
                      objRoot: $state,
                      variablePath: ["friendsTooltip"]
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
              $steps["updateFriendsTooltip"] != null &&
              typeof $steps["updateFriendsTooltip"] === "object" &&
              typeof $steps["updateFriendsTooltip"].then === "function"
            ) {
              $steps["updateFriendsTooltip"] = await $steps[
                "updateFriendsTooltip"
              ];
            }
          }}
        >
          <PlasmicImg__
            alt={""}
            className={classNames(sty.img__hUHpG)}
            displayHeight={"40px"}
            displayMaxHeight={"none"}
            displayMaxWidth={"100%"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={"40px"}
            loading={"lazy"}
            src={{
              src: "/plasmic/friendo/images/icons8Friends48Png.png",
              fullWidth: 48,
              fullHeight: 48,
              aspectRatio: undefined
            }}
          />

          {(() => {
            try {
              return $state.friendsTooltip;
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
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__vcEDc
              )}
            >
              {"See all friends"}
            </div>
          ) : null}
        </div>
        <div className={classNames(projectcss.all, sty.freeBox___57Kti)}>
          <div
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text___5LnP
            )}
            onClick={async event => {
              const $steps = {};
              $steps["goToAboutUs"] = true
                ? (() => {
                    const actionArgs = { destination: `/about-us` };
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
                $steps["goToAboutUs"] != null &&
                typeof $steps["goToAboutUs"] === "object" &&
                typeof $steps["goToAboutUs"].then === "function"
              ) {
                $steps["goToAboutUs"] = await $steps["goToAboutUs"];
              }
            }}
          >
            {"About Us"}
          </div>
        </div>
      </div>
    </div>
  );
}

const PlasmicDescendants = {
  root: ["root"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicNavBar__ArgProps,
          internalVariantPropNames: PlasmicNavBar__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicNavBar__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicNavBar";
  } else {
    func.displayName = `PlasmicNavBar.${nodeName}`;
  }
  return func;
}

export const PlasmicNavBar = Object.assign(
  // Top-level PlasmicNavBar renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    // Metadata about props expected for PlasmicNavBar
    internalVariantProps: PlasmicNavBar__VariantProps,
    internalArgProps: PlasmicNavBar__ArgProps
  }
);

export default PlasmicNavBar;
/* prettier-ignore-end */

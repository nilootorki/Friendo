// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: d1S8dWKKr4PVKg3azHqMAd
// Component: I5AXkEeNuKel
import * as React from "react";
import { useRouter } from "next/router";
import {
  Stack as Stack__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  hasVariant,
  renderPlasmicSlot,
  useDollarState
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";
import { BaseLabel } from "@plasmicpkgs/react-aria/skinny/registerLabel";
import "@plasmicapp/react-web/lib/plasmic.css";
import plasmic_antd_5_hostless_css from "../antd_5_hostless/plasmic.module.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: d1S8dWKKr4PVKg3azHqMAd/projectcss
import sty from "./PlasmicLabel.module.css"; // plasmic-import: I5AXkEeNuKel/css

createPlasmicElementProxy;

export const PlasmicLabel__VariantProps = new Array(
  "size",
  "requirementIndicator"
);

export const PlasmicLabel__ArgProps = new Array("children");

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicLabel__RenderFunc(props) {
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
        path: "size",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) => $props.size
      },
      {
        path: "requirementIndicator",
        type: "private",
        variableType: "variant",
        initFunc: ({ $props, $state, $queries, $ctx }) =>
          $props.requirementIndicator
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
    <BaseLabel
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        "__wab_instance",
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_antd_5_hostless_css.plasmic_tokens,
        sty.root,
        {
          [sty.rootrequirementIndicator_optional]: hasVariant(
            $state,
            "requirementIndicator",
            "optional"
          ),
          [sty.rootrequirementIndicator_required]: hasVariant(
            $state,
            "requirementIndicator",
            "required"
          ),
          [sty.rootsize_lg]: hasVariant($state, "size", "lg"),
          [sty.rootsize_sm]: hasVariant($state, "size", "sm")
        }
      )}
    >
      <Stack__
        as={"div"}
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox, {
          [sty.freeBoxrequirementIndicator_optional]: hasVariant(
            $state,
            "requirementIndicator",
            "optional"
          ),
          [sty.freeBoxsize_lg]: hasVariant($state, "size", "lg"),
          [sty.freeBoxsize_sm]: hasVariant($state, "size", "sm")
        })}
      >
        {renderPlasmicSlot({
          defaultContents: "Label",
          value: args.children,
          className: classNames(sty.slotTargetChildren, {
            [sty.slotTargetChildrenrequirementIndicator_optional]: hasVariant(
              $state,
              "requirementIndicator",
              "optional"
            ),
            [sty.slotTargetChildrenrequirementIndicator_required]: hasVariant(
              $state,
              "requirementIndicator",
              "required"
            ),
            [sty.slotTargetChildrensize_lg]: hasVariant($state, "size", "lg"),
            [sty.slotTargetChildrensize_sm]: hasVariant($state, "size", "sm")
          })
        })}
        <div
          data-plasmic-name={"text"}
          data-plasmic-override={overrides.text}
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text,
            {
              [sty.textrequirementIndicator_optional]: hasVariant(
                $state,
                "requirementIndicator",
                "optional"
              ),
              [sty.textrequirementIndicator_required]: hasVariant(
                $state,
                "requirementIndicator",
                "required"
              )
            }
          )}
        >
          {hasVariant($state, "requirementIndicator", "required")
            ? "*"
            : "(optional)"}
        </div>
      </Stack__>
    </BaseLabel>
  );
}

const PlasmicDescendants = {
  root: ["root", "freeBox", "text"],
  freeBox: ["freeBox", "text"],
  text: ["text"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicLabel__ArgProps,
          internalVariantPropNames: PlasmicLabel__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicLabel__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicLabel";
  } else {
    func.displayName = `PlasmicLabel.${nodeName}`;
  }
  return func;
}

export const PlasmicLabel = Object.assign(
  // Top-level PlasmicLabel renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent("freeBox"),
    text: makeNodeComponent("text"),
    // Metadata about props expected for PlasmicLabel
    internalVariantProps: PlasmicLabel__VariantProps,
    internalArgProps: PlasmicLabel__ArgProps
  }
);

export default PlasmicLabel;
/* prettier-ignore-end */

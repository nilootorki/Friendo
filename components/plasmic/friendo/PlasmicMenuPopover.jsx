// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: d1S8dWKKr4PVKg3azHqMAd
// Component: dvwTw_dfn0T0
import * as React from "react";
import { useRouter } from "next/router";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  generateOnMutateForSpec,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  initializeCodeComponentStates,
  renderPlasmicSlot,
  useDollarState
} from "@plasmicapp/react-web";
import { useDataEnv } from "@plasmicapp/react-web/lib/host";
import { BasePopover } from "@plasmicpkgs/react-aria/skinny/registerPopover";
import { BaseListBox } from "@plasmicpkgs/react-aria/skinny/registerListBox";
import { listboxHelpers as BaseListBox_Helpers } from "@plasmicpkgs/react-aria/skinny/registerListBox";
import MenuItem from "../../MenuItem"; // plasmic-import: zcnybJ5YUZhH/component
import MenuSection from "../../MenuSection"; // plasmic-import: AfjdpiB-P5Vp/component
import "@plasmicapp/react-web/lib/plasmic.css";
import plasmic_antd_5_hostless_css from "../antd_5_hostless/plasmic.module.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: d1S8dWKKr4PVKg3azHqMAd/projectcss
import sty from "./PlasmicMenuPopover.module.css"; // plasmic-import: dvwTw_dfn0T0/css

createPlasmicElementProxy;

export const PlasmicMenuPopover__VariantProps = new Array();

export const PlasmicMenuPopover__ArgProps = new Array(
  "offset",
  "menuItems",
  "initialSelectedKey"
);

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicMenuPopover__RenderFunc(props) {
  const { variants, overrides, forNode } = props;
  const args = React.useMemo(
    () =>
      Object.assign(
        {
          offset: 2
        },
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
        path: "ariaListBox.selectedValue",
        type: "private",
        variableType: "text",
        initFunc: ({ $props, $state, $queries, $ctx }) =>
          $props["initialSelectedKey"],
        onMutate: generateOnMutateForSpec("selectedValue", BaseListBox_Helpers)
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
  const [$ccVariants, setDollarCcVariants] = React.useState({
    placementTop: false,
    placementBottom: false,
    placementLeft: false,
    placementRight: false
  });
  const updateVariant = React.useCallback(changes => {
    setDollarCcVariants(prev => {
      if (!Object.keys(changes).some(k => prev[k] !== changes[k])) {
        return prev;
      }
      return { ...prev, ...changes };
    });
  }, []);
  return (
    <BasePopover
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
        sty.root
      )}
      matchTriggerWidth={true}
      offset={args.offset}
      placement={"bottom"}
      plasmicUpdateVariant={updateVariant}
      resetClassName={classNames(
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_antd_5_hostless_css.plasmic_tokens
      )}
      shouldFlip={true}
    >
      {(() => {
        const child$Props = {
          className: classNames("__wab_instance", sty.ariaListBox),
          defaultSelectedKeys: args.initialSelectedKey,
          onSelectionChange: async (...eventArgs) => {
            generateStateOnChangePropForCodeComponents(
              $state,
              "selectedValue",
              ["ariaListBox", "selectedValue"],
              BaseListBox_Helpers
            ).apply(null, eventArgs);
          },
          selectedKeys: generateStateValueProp($state, [
            "ariaListBox",
            "selectedValue"
          ]),
          selectionMode: "single"
        };
        initializeCodeComponentStates(
          $state,
          [
            {
              name: "selectedValue",
              plasmicStateName: "ariaListBox.selectedValue"
            }
          ],

          [],
          BaseListBox_Helpers ?? {},
          child$Props
        );
        return (
          <BaseListBox
            data-plasmic-name={"ariaListBox"}
            data-plasmic-override={overrides.ariaListBox}
            {...child$Props}
          >
            {renderPlasmicSlot({
              defaultContents: (
                <React.Fragment>
                  <MenuItem
                    className={classNames(
                      "__wab_instance",
                      sty.menuItem__kvUc2
                    )}
                    value={"item1"}
                  />

                  <MenuItem
                    className={classNames(
                      "__wab_instance",
                      sty.menuItem__enlEp
                    )}
                    label={"Item 2"}
                    value={"item2"}
                  />

                  <MenuItem
                    className={classNames(
                      "__wab_instance",
                      sty.menuItem___7PvwS
                    )}
                    label={"Item 3"}
                    value={"item3"}
                  />

                  <MenuSection
                    className={classNames(
                      "__wab_instance",
                      sty.menuSection__uke1G
                    )}
                    items={
                      <React.Fragment>
                        <MenuItem
                          label={"Section Item 1"}
                          value={"section-item-1"}
                        />

                        <MenuItem
                          label={"Section Item 2"}
                          value={"section-item-2"}
                        />

                        <MenuItem
                          label={"Section Item 3"}
                          value={"section-item-3"}
                        />
                      </React.Fragment>
                    }
                  />
                </React.Fragment>
              ),

              value: args.menuItems
            })}
          </BaseListBox>
        );
      })()}
    </BasePopover>
  );
}

const PlasmicDescendants = {
  root: ["root", "ariaListBox"],
  ariaListBox: ["ariaListBox"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicMenuPopover__ArgProps,
          internalVariantPropNames: PlasmicMenuPopover__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicMenuPopover__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicMenuPopover";
  } else {
    func.displayName = `PlasmicMenuPopover.${nodeName}`;
  }
  return func;
}

export const PlasmicMenuPopover = Object.assign(
  // Top-level PlasmicMenuPopover renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    ariaListBox: makeNodeComponent("ariaListBox"),
    // Metadata about props expected for PlasmicMenuPopover
    internalVariantProps: PlasmicMenuPopover__VariantProps,
    internalArgProps: PlasmicMenuPopover__ArgProps
  }
);

export default PlasmicMenuPopover;
/* prettier-ignore-end */

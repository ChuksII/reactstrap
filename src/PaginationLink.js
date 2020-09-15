import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { mapToCssModules, tagPropType } from "./utils";

const propTypes = {
  "aria-label": PropTypes.string,
  "aria-disabled": PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  tag: tagPropType,
};

const defaultProps = {
  tag: "a",
};

const defaultAriaDisabled = "false";

const PaginationLink = (props) => {
  let {
    className,
    cssModule,
    next,
    previous,
    first,
    last,
    tag: Tag,
    ...attributes
  } = props;

  const classes = mapToCssModules(
    classNames(className, "page-link"),
    cssModule
  );

  let defaultAriaLabel;
  if (previous) {
    defaultAriaLabel = "Previous";
    defaultAriaDisabled = "true";
  } else if (next) {
    defaultAriaLabel = "Next";
    defaultAriaDisabled = "false";
  } else if (first) {
    defaultAriaLabel = "First";
    defaultAriaDisabled = "false";
  } else if (last) {
    defaultAriaLabel = "Last";
    defaultAriaDisabled = "false";
  }

  const ariaLabel = props["aria-label"] || defaultAriaLabel;
  const ariaDisabled = props["aria-disabled" || defaultAriaDisabled];

  let defaultCaret;
  if (previous) {
    defaultCaret = "\u2039";
  } else if (next) {
    defaultCaret = "\u203A";
  } else if (first) {
    defaultCaret = "\u00ab";
  } else if (last) {
    defaultCaret = "\u00bb";
  }

  let children = props.children;
  if (children && Array.isArray(children) && children.length === 0) {
    children = null;
  }

  if (!attributes.href && Tag === "a") {
    Tag = "button";
  }

  if (previous || next || first || last) {
    children = [
      <span aria-hidden="true" key="caret">
        {children || defaultCaret}
      </span>,
      <span className="sr-only" key="sr">
        {ariaLabel}
      </span>,
    ];
  }

  if (previous) {
    return (
      <Tag
        {...attributes}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={ariaDisabled}
      >
        {children}
      </Tag>
    );
  } else {
    return (
      <Tag
        {...attributes}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={ariaDisabled}
      >
        {children}
      </Tag>
    );
  }
};

PaginationLink.propTypes = propTypes;
PaginationLink.defaultProps = defaultProps;

export default PaginationLink;

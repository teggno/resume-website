import React from "react";
import PropTypes from 'prop-types';
import { icon } from "../../css";
import certificateIcon from "./certificate";
import codeIcon from "./code";
import puzzleIcon from "./puzzle";
import manWithCompanyIcon from "./manWithCompany";

export function ArrowDown(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`${
        props.addPaddingLeft ? 0 : 10
      } 0 40 40`}
      preserveAspectRatio="xMidYMid meet"
      className={icon}
    >
      {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/  */}
      <g>
        <path
          d="m10,15l10,10l10,-10"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`${
        props.addPaddingLeft ? 0 : 10
      } 0 40 40`}
      preserveAspectRatio="xMidYMid meet"
      className={icon}
    >
      {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/  */}
      <g>
        <path
          d="m10,25l10,-10l10,10"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export const CertificateIcon = certificateIcon;
export const CodeIcon = codeIcon;
export const PuzzleIcon = puzzleIcon;
export const ManWithCompanyIcon = manWithCompanyIcon;

export interface IconProps {
  /** If true, there will be no left padding. Comes in handy when the icon is
   * used in a button that contains the icon followed by some text */
  addPaddingLeft?: boolean;
}

const iconPropTypes = {
  addPaddingLeft: PropTypes.bool
};

const iconDefaultProps = {
  addPaddingLeft: true,
};

ArrowDown.propTypes = iconPropTypes;
ArrowDown.defaultProps = iconDefaultProps;

ArrowUp.propTypes = iconPropTypes;
ArrowUp.defaultProps = iconDefaultProps;

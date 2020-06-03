import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField as MuiTextField, Typography } from "@material-ui/core"
import MoreInfo from "../Popover/MoreInfo"

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    "& > *": {
      margin: theme.spacing( 1 ),
      width: "25ch",
    },
  },
  moreInfo: {
    position: 'absolute',
    top: 9,
    right: 0,
    // left: 85,
    // top: 22,
  },
  container: {
    position: 'relative',
    width: '100%',
  },
  multiText: {
    paddingBottom: 20,
  },
} ) )

export default function TextField( {
  className,
  info,
  infoStyles,
  fullWidth,
  label,
  type,
  value,
  variant,
}: Props ) {
  const classes = useStyles()
  let lastTextItem;
  if ( info && info.constructor === Array ) {
    lastTextItem = info.length - 1;
  }

  return (
    <div className={ classes.container }>
      {
        ( info && typeof info === 'string' )  && (
          <MoreInfo className={ `${ classes.moreInfo } ${ infoStyles }` }>
            <Typography variant="body2">
              { info }
            </Typography>
          </MoreInfo>
        )
      }

      {
        ( info && info.constructor === Array ) && (
          <MoreInfo className={ `${ classes.moreInfo } ${ infoStyles }` }>
            {
              ( info as string[] ).map( ( text, index ) => (
                <Typography
                  key={ text }
                  className={ index !== lastTextItem && classes.multiText }
                  variant="body2">
                  { text }
                </Typography>
              ) )
            }
          </MoreInfo>
        )
      }

      {/*
          // @ts-ignore */}
      <MuiTextField
        className={ className }
        fullWidth={ fullWidth }
        label={ label }
        type={ type }
        value={ value }
        variant={ variant }
      />
    </div>

  );
}

type Props = {
  className?: string,
  fullWidth?: boolean,
  label: string,
  type?: string,
  value: any,
  variant?: 'filled' | 'outlined' | 'standard',

  // custom props
  info?: string | string[],
  infoStyles?: string,
};
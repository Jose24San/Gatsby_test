import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import MaterialTable from 'material-table';
import MoreInfo from '../Popover/MoreInfo';


const useStyles = makeStyles( theme => ( {
  multiLine: {
    marginBottom: 10,
  },
  popover: {
    position: 'absolute',
    marginTop: 2,
    zIndex: 100,
  },
  popoverContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: 30,
  },
} ) );

const Table = ( {
  columns,
  containerStyle,
  containerClassName,
  data,
  descriptionText,
  iconClassName,
  popoverClassName,
}: Props ) => {
  const classes = useStyles();


  return (
    <div className={ containerClassName } style={ containerStyle }>
      <div className={ classes.popoverContainer }>
        <MoreInfo
          iconClassName={ classes.icon }
          className={ classes.popover }
        >
          {
            typeof descriptionText === 'string' && descriptionText.length
              ? (
                <Typography variant="body2">
                  { descriptionText }
                </Typography>
              )
              : (descriptionText as string[]).map( text => (
                <Typography variant="body2" className={ classes.multiLine }>
                  { text }
                </Typography>
              ) )
          }
        </MoreInfo>
      </div>

      <MaterialTable
        options={ {
          search: false,
          paging: false,
          toolbar: false,
        } }
        columns={ columns }
        data={ data }
      />
    </div>
  );
};

type Props = {
  columns: { title: string, field: string, [x: string]: any }[],
  containerClassName?: string,
  containerStyle?: object,
  data: { [x:string]: any }[],
  descriptionText?: string | string[],
  iconClassName?: string,
  popoverClassName?: string,
};

export default Table;

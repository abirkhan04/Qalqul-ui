import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@mui/icons-material/Edit';
import SvgIcon from '@material-ui/core/SvgIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EditRow } from './edit-row';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ImageUploadPopup } from './image-upload-popup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import constants from '../../constants';

function FileUpload(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </SvgIcon>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
  const { columns, classes, order, orderBy, onRequestSort, serialNumberVisible } = props;
  const { t } = useTranslation();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {serialNumberVisible ? <TableCell width={`${parseInt(100/(columns.length+1))}%`} align={'center'}>{t('Sl#')}</TableCell> : <></>}
        {columns.filter((column) => !column.hidden).map((headCell, index) => (
          <TableCell
            width={`${parseInt(serialNumberVisible?100/(columns.length+1): 100/columns.length)}%`}
            key={index++}
            className={headCell.type === 'action' ? 'action' : null}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel classes={{root:classes.colHead}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  serialNumberVisible: PropTypes.bool,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  switchBase: {
    color: '#4E342E !important',
    '&$checked': {
      color: '#4E342E !important',
    },
    '&$checked + $track': {
      backgroundColor: '#4E342E !important',
      opacity: '1'
    },
  },
  checked: {},
  track: {},
  paper: {
    width: '100%',
    marginBottom: '4px !important',
  },
  table: {
    minWidth: 750,
  },
  tableCell: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  colHead: {
    paddingLeft: '26px !important'
  },
  dialogPaper: {
    width: '350px',
    padding: '8px',
    backgroundColor: '#8D6E63 !important'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
    display: 'inline-block'
  },
  resets: {
    backgroundColor: 'white !important',
    color: '#4E342E !important'
  },
  falsy: {
    backgroundColor: 'white !important',
    color: 'red !important'
  },
  anchor: {
    color: '#4E342E',
    textDecoration: 'none'
  }
}));


export const DataTable = (props) => {
  const { columns, name, editEntry, deleteHandler, editHandler, flags, editHidden, imageHandler, tableRows, addHidden, serialNumberVisible, deleteHidden, forwardedRef } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [onEditRow, setOnEditRow] = React.useState({});
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { t } = useTranslation();


  const state = useSelector((state) => state.imageReducers);

  const handleRequestSort = (event, property) => {
    if (orderBy) {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      if (!isAsc) setOrderBy(constants.EMPTY_STRING);
      else setOrderBy(property);
    } else {
      setOrder('asc');
      setOrderBy(property);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableRows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const editRow = (row) => {
    const column = columns.find((column) => column.functionBinding);
    if (row && column) {
      editEntry(row.id).then((fullRow) => {
        column.functionBinding(fullRow.id).then((options) => {
          column.options = options;
          setOnEditRow(fullRow);
          setOpen(true);
        });
      });
    } else if (row) {
        setOnEditRow(row);
        setOpen(true);
    } else {
      setOnEditRow({});
      setOpen(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
    if (state.imageData) {
      if (imageHandler && state.imageData.length > 1) {
        const images = state.imageData.map((image) => {
          return { rowId: onEditRow.id, imageId: image.id };
        });
        dispatch(imageHandler(images)).then(() => {
          state.imageData = undefined;
        });
      } else {
        editEntry(onEditRow.id).then((editRow) => {
          editRow.image = state.imageData;
          dispatch(editHandler(editRow)).then(() => {
            state.imageData = undefined;
          });
        });
      }
    }
  }

  const handleUploadOpen = (row) => {
    setOpenUpload(true);
    editEntry(row.id).then((fullRow) => {
      setOnEditRow(fullRow);
    });
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleDelete = (id) => {
    let dispatchDelete = dispatch(deleteHandler(id));
    if (dispatchDelete instanceof Promise) {
      dispatchDelete.then(() => { if (tableRows.length > 0 && ((rowsPerPage * page + 1) > tableRows.length)) setPage(page - 1) });
    } else {
      if (tableRows.length > 0 && (rowsPerPage * page + 1) > tableRows.length) setPage(page - 1);
    }
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      {!addHidden ? <AddIcon style={{ cursor: 'pointer', float: 'right' }} onClick={() => editRow(null)} /> : <></>}
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            ref={forwardedRef}
            className={classes.table}
            aria-labelledby="tableTitle"
            padding="normal"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              serialNumberVisible={serialNumberVisible}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              columns={columns}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableRows.length} />
            <TableBody>
              {stableSort(tableRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (<TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                  >{serialNumberVisible ? <TableCell align={'center'}>
                    {index + 1}
                  </TableCell> : <></>}
                    {columns.filter((column) => !column.hidden).map((column, colIndex) => <TableCell className={`${classes.tableCell} ${column.type === 'action' ? 'action' : null}`}  key={colIndex} align={column.numeric ? 'right' : 'center'}>{!column.type && (typeof row[column.id] === 'string' | typeof row[column.id] === 'number') ? row[column.id] :
                      column.type === 'boolean' ? <>{row[column.id] ? <Button>
                        {t(column.truthy)}
                      </Button> : <Button  className={classes.falsy}>
                        {t(column.falsy)}
                      </Button>}</> : column.type === 'reference' ? <>{row[column.id] ? row[column.id][column.displayProperty] : <></>}</> 
                      : column.type === 'multiple' ? <>{row[column.id] ? row[column.id].map((item)=> item[column.displayProperty]).join(', ') : <></>}</> 
                      : column.type === 'action' ? <>
                          {!editHidden ? <EditIcon style={{ cursor: 'pointer' }} onClick={() => editRow(row)} /> : <></>}
                          {!deleteHidden ? <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id || (page * rowsPerPage + index))} /> : <></>}
                          {flags && flags.uploadVisible ? <FileUpload style={{ cursor: 'pointer' }} onClick={() => handleUploadOpen(row)} /> : <></>}
                        </> : column.type==='anchor'? <><Link to={`${column.link}/${row.id}`} className={classes.anchor}>{row[column.id]}</Link></>:<></>
                    }</TableCell>)}
                  </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow className={'empty-row'} style={{ height: (dense ? 33 : 53) * 0 }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={t("Rows per page")}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} classes={{ switchBase: classes.switchBase, track: classes.track, checked: classes.checked }} />}
        label={t("Dense padding")}
      />
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title"> <Typography align="center" color="textSecondary">{t(onEditRow.id? `Edit ${name}`: `Add ${name}`)}</Typography></DialogTitle>
        <DialogContent>
          <EditRow row={onEditRow} columns={columns.filter((column) => !column.displayOnly)} submitEditHandler={editHandler} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" className={classes.resets} onClick={handleClose}>
              {t('button.close')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpload}
        onClose={handleUploadClose}
        aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title"> <Typography align="center" color="textSecondary">Upload Image</Typography></DialogTitle>
        <DialogContent>
          <ImageUploadPopup profileImage={onEditRow.image} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUploadClose}>
              Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

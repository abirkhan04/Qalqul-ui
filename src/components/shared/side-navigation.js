import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import authService from '../../services/auth-service';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledTreeItemRoot } from './styled-tree-item-root';

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  wrapper: {
    background: '#4E342E',
    position: 'relative',
    left: '0px',
    top: '0px',
    width: '240px',
    overflow: 'hidden',
    border: '1px solid #1A237E',
    borderRadius: '6px',
    paddingTop: '20px',
    paddingLeft: '10px',
    marginLeft: '10px',
    paddingBottom: '20px',
    height: 'fit-content'
  },
  label: {
    color: 'white',
    fontWeight: '600',
    width: 'fit-content',
    backgroundColor: 'transparent',
    maxWidth: '200px',
    wordBreak: 'break-word'
  }
});


const SideNavigation = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const { navItems } = props;
  const itemClicked = (item) => {
    history.push(item.url);
  };
  const logoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  }

  const isValidRole = (item) => (!item.roles || (item.roles && authService.getUser().roles.find((role) => item.roles.includes(role.role))));

  return (<div className={classes.wrapper}>
   <TreeView
      aria-label="side-nav"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 'auto', flexGrow: 1, maxWidth: 230, overflowY: 'auto', overflowX: 'hidden' }}
    >
      {navItems.filter((item) => isValidRole(item)).map((item) => {
        return <React.Fragment key={item.title}>
          {item.childs && item.childs.length > 0 ? <StyledTreeItem classes={{ label: classes.label }}  nodeId={item.title} labelText={t(item.title)} color="white" onClick={() => itemClicked(item)}> {
            item.childs.map((child) => {
              return <StyledTreeItem classes={{ label: classes.label }} nodeId={child.title} key={child.title}  labelText={t(child.title)} color="white" onClick={() => itemClicked(child)} />
            })
          }</StyledTreeItem > : <StyledTreeItem classes={{ label: classes.label }}  nodeId={item.title} labelText={t(item.title)} color="white" onClick={() => itemClicked(item)} />}
        </React.Fragment>
      })
      }
      <StyledTreeItem classes={{ label: classes.label }} nodeId={'logout'} labelText={t('Log Out')} color="white" onClick={logoutClicked} />
    </TreeView>
  </div>
  );
}
export default SideNavigation;

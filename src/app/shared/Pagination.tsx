import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Select, MenuItem } from "@material-ui/core";
import { useMediaPredicate } from 'react-media-hook';
import { FormControlLabel } from '@mui/material';
import Styles from './Pagination.module.css';

type AppProps = {
    pageCount: number;
    pageSize: number;
    pageNumber: number;
    previousClicked: ()=> void;
    nextClicked: ()=> void;
    linkClicked: (link: number)=> void;
    pageSizeChanged: (value: number)=> void;
}


export default function Pagination({ pageCount, pageSize, pageNumber, previousClicked, nextClicked, linkClicked, pageSizeChanged }: AppProps) {
    const links = [...(Array(pageCount).keys())].map((item) => item + 1);
    let beginIndex = (pageNumber - 2) < 0 ? 0 : (pageNumber - 2);
    let endIndex = (pageNumber + 2) > pageCount ? pageCount : (pageNumber + 2);
    const sizes = [2, 3, 5, 7, 10, 12];
    const smallerThan400 = useMediaPredicate("(max-width: 450px)");
    return <div className={ Styles.root} style={smallerThan400 ? { flexDirection: 'column', alignItems: 'center'} : {}}>
        {pageCount > 0 ? <FormControlLabel
            classes={{ root:  Styles.controlLabel }}
            control={<Select
                id="select"
                className={ Styles.select}
                value={pageSize}
                onChange={(event) => pageSizeChanged(event.target.value as number)}>
                {sizes.map((item, index) => {
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
                <MenuItem value={'Select ...'} disabled>Select ...</MenuItem>
            </Select>}
            label={'rows'} /> : <div></div>}
        <span>
            {pageNumber > 1 ? <IconButton onClick={()=>previousClicked()}><ChevronLeft /></IconButton> : <></>}{links.slice(beginIndex, endIndex).map((link) => <IconButton className={ Styles.links}
                onClick={() => linkClicked(link)}
                key={link}><span style={{ fontSize: '14px' }} className={pageNumber === link ?  Styles.selected : ''}>{link}</span></IconButton>)}
            {pageNumber < pageCount ? <IconButton onClick={()=>nextClicked()}><ChevronRight /></IconButton> : <></>}
        </span>
    </div>
}


import React from 'react';
import Card from '@material-ui/core/Card'
import { useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Styles from './MovieCard.module.css';
import { IkeyValue } from '../interfaces/app-interfaces';
import { Rating } from '@mui/material';

type AppProps = {
    card: IkeyValue;
};

export const MovieCard = ({ card }: AppProps) => {
    const smallerThan600 = useMediaPredicate("(max-width: 768px)");
    const navigate = useNavigate();

    return <React.Fragment><Card className={Styles.root} style={smallerThan600 ? { flexDirection: 'column', height: 'fit-content' } : {}}>
        <div className={Styles.child} style={smallerThan600 ? { width: '100%', height: '300px', border: 'none' } : {}} onClick={() => navigate(`/card-detail/${card.id}`)}>
            <img className={Styles.image} alt={'Img'} src={require('../../assets/movie.PNG')} style={smallerThan600 ? { maxWidth: '100%', maxHeight: '100%' } : {}} />
        </div>
        <div className={Styles.child} style={smallerThan600 ? { textAlign: 'center' } : {}}>
            <span className={Styles.title}>{card.title || 'title'}</span><br />
            <br />
            <p>{card.detail}</p>
        </div>
        <div className={Styles.child} style={smallerThan600 ? { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderLeft: 'none' } : {}}>
            <div className={Styles.cartDescription} style={smallerThan600 ? { alignItems: 'flex-start' } : {}}>
                <Rating name="read-only" value={card.rating} precision={0.1} size="small" />
            </div>
        </div>
    </Card>
    </React.Fragment>
}

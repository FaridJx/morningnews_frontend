import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hidden } from '../reducers/hiddenArticles';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Article(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);


	const handleHidden = () => {
		dispatch(hidden(props))
		// console.log('click');
	}

	const handleBookmarkClick = () => {
		if (!user.token) {
			return;
		}
		fetch(`https://morningnews-backend-xi.vercel.app/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (props.isBookmarked) {
						dispatch(removeBookmark(props));
					} else {
						dispatch(addBookmark(props));
					}
				}
			});
	}


	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	return (
		<div className={styles.articles}>
			<div className={styles.articleHeader}>
				<h3>{props.title}</h3>
				<FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
				<FontAwesomeIcon onClick={() => handleHidden()} icon={faEyeSlash} />
			</div>
			<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
			<div className={styles.divider}></div>
			<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
			<p>{props.description}</p>
		</div>
	);
}

export default Article;

import Featured from "../Components/Featured/Featured"
import Hero from "../Components/Hero/Hero"
import NewCollections from "../Components/NewCollections/NewCollections"
import NewsLetter from "../Components/NewsLetter/NewsLetter"

const Home = () => {
	return (
		<div>
			<Hero/>
			<Featured/>
			<NewCollections/>
			<NewsLetter/>
		</div>
	)
}

export default Home
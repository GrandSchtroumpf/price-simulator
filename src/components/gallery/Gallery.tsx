import { component$, useStyles$ } from "@qwik.dev/core";
import Img1 from '~/media/gallery/1.webp?jsx';
import Img2 from '~/media/gallery/2.webp?jsx';
import Img3 from '~/media/gallery/3.webp?jsx';
import Img4 from '~/media/gallery/4.webp?jsx';
import Img5 from '~/media/gallery/5.webp?jsx';
import style from './Gallery.css?inline';
import { SplittedText } from "../SplittedText";

const articles = [{
	label: 'Terrasse et garde corps',
	img: <Img1 alt="Ouvrage de menuiserie" height="300" />,
	text: "Menuisier passionné, je conçois et réalise des terrasses en bois sur mesure, adaptées à votre espace et à vos usages. J'y associe des garde-corps sécurisés et esthétiques, pensés pour durer dans le temps, tout en valorisant l'architecture de votre extérieur."
}, {
	label: 'Soutènement bois',
	img: <Img2 alt="Ouvrage de menuiserie" height="300" />,
	text: "Je réalise des ouvrages de soutènement en bois et des structures de charpente robustes, adaptés aux contraintes du terrain. Chaque projet est conçu pour garantir stabilité, longévité et intégration naturelle, tout en respectant les règles de construction et le savoir-faire artisanal."
}, {
	label: 'Brise vue',
	img: <Img3 alt="Ouvrage de menuiserie" height="300" />,
	text: "Je crée des brise-vue en bois sur mesure, du muret jusqu'au plafond, en prenant en compte des matériaux adaptés à vos budgets. Chaque réalisation s'adapte à votre espace, joue avec les lignes et les essences, et apporte une touche chaleureuse et contemporaine à votre habitat."
}, {
	label: 'Terrasse et bardage',
	img: <Img4 alt="Ouvrage de menuiserie" height="300" />,
	text: "Je conçois des terrasses et bardages en bois qui structurent et embellissent votre maison. Ces réalisations associent esthétique, protection et durabilité, tout en mettant en valeur les volumes existants et le caractère naturel du bois, travaillé avec précision et exigence."
}, {
	label: 'Portail principal',
	img: <Img5 alt="Ouvrage de menuiserie" height="300" />,
	text: "Je fabrique des portails principaux en bois à coupe naturelle, alliant caractère authentique et robustesse. Chaque pièce est unique, respectant le veinage et la matière, pour offrir une entrée forte en identité, durable et parfaitement intégrée à son environnement."
}]

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<div class="scroll-indicator">
				<div class="line"></div>
				<div class="diamonds"></div>
			</div>
			{articles.map((article, i) => (
				<article key={i} class="slot" style={{'--index': i}}>
					<figure>
						<figcaption>{article.label}</figcaption>
						{article.img}
					</figure>
					<p>
						<SplittedText mode="word" text={article.text} />
					</p>
				</article>
			))}
		</section>
	)
});
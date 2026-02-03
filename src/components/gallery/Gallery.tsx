import { component$, useStyles$ } from "@qwik.dev/core";
import Img1 from '~/media/gallery/1.webp?jsx';
import Img2 from '~/media/gallery/2.webp?jsx';
import Img3 from '~/media/gallery/3.webp?jsx';
import Img4 from '~/media/gallery/4.webp?jsx';
import Img5 from '~/media/gallery/5.webp?jsx';
import style from './Gallery.css?inline';

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<div class="scroll-indicator">
				<div class="line"></div>
				<div class="diamonds"></div>
			</div>
			<div class="slot" style="--index:1">
				<figure>
					<figcaption>Terrasse et garde corps</figcaption>
					<Img1 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Menuisier passionné, je conçois et réalise des terrasses en bois sur mesure, adaptées à votre espace et à vos usages. J'y associe des garde-corps sécurisés et esthétiques, pensés pour durer dans le temps, tout en valorisant l'architecture de votre extérieur.</p>
			</div>
			<div class="slot" style="--index:2">
				<p>Je réalise des ouvrages de soutènement en bois et des structures de charpente robustes, adaptés aux contraintes du terrain. Chaque projet est conçu pour garantir stabilité, longévité et intégration naturelle, tout en respectant les règles de construction et le savoir-faire artisanal.</p>
				<figure>
					<figcaption>Soutènement bois</figcaption>
					<Img2 alt="Ouvrage de menuiserie" height="300" />
				</figure>
			</div>
			<div class="slot" style="--index:3">
				<figure>
					<figcaption>Brise vue</figcaption>
					<Img3 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Je crée des brise-vue en bois sur mesure, du muret jusqu'au plafond, en prenant en compte des matériaux adaptés à vos budgets. Chaque réalisation s'adapte à votre espace, joue avec les lignes et les essences, et apporte une touche chaleureuse et contemporaine à votre habitat.</p>
			</div>
			<div class="slot" style="--index:4">
				<p>Je conçois des terrasses et bardages en bois qui structurent et embellissent votre maison. Ces réalisations associent esthétique, protection et durabilité, tout en mettant en valeur les volumes existants et le caractère naturel du bois, travaillé avec précision et exigence.</p>
				<figure>
					<figcaption>Terrasse et bardage</figcaption>
					<Img4 alt="Ouvrage de menuiserie" height="300" />
				</figure>
			</div>
			<div class="slot" style="--index:5">
				<figure>
					<figcaption>Portail principal</figcaption>
					<Img5 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Je fabrique des portails principaux en bois à coupe naturelle, alliant caractère authentique et robustesse. Chaque pièce est unique, respectant le veinage et la matière, pour offrir une entrée forte en identité, durable et parfaitement intégrée à son environnement.</p>
			</div>
		</section>
	)
});
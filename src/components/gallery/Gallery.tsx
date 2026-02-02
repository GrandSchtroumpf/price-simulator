import { component$, useStyles$ } from "@qwik.dev/core";
import Img1 from '~/media/gallery/1.webp?jsx';
import Img2 from '~/media/gallery/2.webp?jsx';
import Img3 from '~/media/gallery/3.webp?jsx';
import style from './Gallery.css?inline';

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<div class="scroll-indicator">
				<div class="line"></div>
				<div class="diamonds"></div>
			</div>
			<figure style="--index:1">
				<figcaption>Terrasse bois</figcaption>
				<Img1 alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:2">
				<figcaption>Soutènement bois</figcaption>
				<Img2 alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:3">
				<figcaption>Persiennes</figcaption>
				<Img3 alt="Ouvrage de menuiserie" height="300" />
			</figure>
		</section>
	)
});
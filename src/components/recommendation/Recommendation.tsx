import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Recommendation.css?inline';
import scrollAnimation from './ScrollAnimation.css?raw';
import Stars from "../stars/Stars";
// @ts-expect-error see vite-imagetools doc: https://github.com/JonasKruckenberg/imagetools/blob/main/docs/_media/directives.md
import profileMobile from '~/media/profile-mobile.webp?as=srcset';
import ImgProfile from '~/media/profile-desktop.webp?jsx';

export default component$(() => {
	/** Remove when lightningcss > 1.30.2 */
	useStyles$(scrollAnimation);
	useStyles$(style);

	return (
		<section id="recommendation">
			<h2>Avis clients</h2>

			<div class="worker-img">
				<picture>
					<source srcset={profileMobile} media="(width < 768px)" />
					<ImgProfile alt="Photographie de Erwan Richard travaillant le bois dans son atelier" />
				</picture>
			</div>

			<ul style="--index: 0">
				<li>
					<img loading="lazy" src="/imgs/home/recommendations/avatar-v.png" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Valérie G</h3>
						<p>Janvier 2026</p>
					</hgroup>
					<Stars />
					<hr />
					<p>Artisan sérieux, à l'écoute et toujours de bons conseils, Erwan a réalisé différents travaux de menuiserie dans ma maison en paille ossature bois (lambris au plafond, tous les encadrements de fenêtre intérieur) ainsi que la pose des cloisons en placo. Je suis très satisfaite du résultat. Je le recommande sans hésitation.</p>
				</li>
				<li style="--index: 1">
					<img loading="lazy" src="/imgs/home/recommendations/avatar-n.png" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Nicolas Fernandes</h3>
						<p>Octobre 2012</p>
					</hgroup>
					<Stars />
					<hr />
					<p>Une terrasse en hauteur de 32m2 faites en 8 jours, rigoureux sérieux et pleins de bonnes idées Erwan a été super. Je le recommande très fortement !</p>
				</li>
				<li style="--index: 2">
					<img loading="lazy" src="/imgs/home/recommendations/avatar-f.png" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Frédéric Gravot</h3>
						<p>Janvier 2025</p>
					</hgroup>
					<Stars />
					<hr />
					<p>Pose d'ouvertures PVC, portes et fenêtres. Travail parfait jusqu'aux finitions. Déjà prévu pour d'autres chantiers. Je recommande sans modération 🤠</p>
				</li>
				<li style="--index: 3">
					<img loading="lazy" src="/imgs/home/recommendations/avatar-g.png" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>G The</h3>
						<p>Il y a plus d'un an</p>
					</hgroup>
					<Stars />
					<hr />
					<p>Intervention sur une réalisation d'isolation intérieure, avec placo et pose des bandes. Travail parfaitement réalisé et très bonne communication.</p>
				</li>
				<li style="--index: 4">
					<img loading="lazy" src="/imgs/home/recommendations/avatar-w.png" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Wilfrid Le Hénaff</h3>
						<p>Mars 2024</p>
					</hgroup>
					<Stars />
					<hr />
					<p>Artisan très sérieux, et d'une finesse dans son travail hors du commun. Très soigneux.</p>
				</li>
			</ul>
		</section>
	)
});
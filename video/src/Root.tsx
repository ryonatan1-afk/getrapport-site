import {Composition} from 'remotion';
import {RapportDemo} from './RapportDemo';

export const RemotionRoot = () => {
	return (
		<Composition
			id="RapportDemo"
			component={RapportDemo}
			durationInFrames={1500}
			fps={30}
			width={1280}
			height={720}
		/>
	);
};

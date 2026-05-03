import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Intro} from './scenes/Intro';
import {ProblemScene} from './scenes/ProblemScene';
import {DigestScene} from './scenes/DigestScene';
import {OpenDraftScene} from './scenes/OpenDraftScene';
import {Outro} from './scenes/Outro';

// Scene timing (frames at 30fps)
// Intro:      0  –  90  (3s)
// Problem:   90  – 210  (4s)
// Digest:   210  – 390  (6s)
// OpenDraft:390  – 570  (6s)
// Outro:    570  – 720  (5s)

export const RapportDemo = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const musicVolume = interpolate(
		frame,
		[0, 20, durationInFrames - 30, durationInFrames],
		[0, 0.18, 0.18, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
			<Audio src={staticFile('audio/background.mp3')} volume={musicVolume} />
			<Sequence from={0} durationInFrames={90}>
				<Intro />
			</Sequence>
			<Sequence from={90} durationInFrames={120}>
				<ProblemScene />
			</Sequence>
			<Sequence from={210} durationInFrames={180}>
				<DigestScene />
			</Sequence>
			<Sequence from={390} durationInFrames={180}>
				<OpenDraftScene />
			</Sequence>
			<Sequence from={570} durationInFrames={150}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};

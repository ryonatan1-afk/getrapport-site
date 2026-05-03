import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Intro} from './scenes/Intro';
import {ProblemScene} from './scenes/ProblemScene';
import {DigestScene} from './scenes/DigestScene';
import {OpenDraftScene} from './scenes/OpenDraftScene';
import {Outro} from './scenes/Outro';

// Scene timing (frames at 30fps)
// Intro:      0  –  90  (3s)
// Problem:   90  – 210  (4s)
// Digest:   210  – 330  (4s)
// OpenDraft:330  – 450  (4s)
// Outro:    450  – 570  (4s)

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
			<Audio src={staticFile('audio/background.mp3')} volume={0.5} />
			<Sequence from={0} durationInFrames={90}>
				<Intro />
			</Sequence>
			<Sequence from={90} durationInFrames={120}>
				<ProblemScene />
			</Sequence>
			<Sequence from={210} durationInFrames={120}>
				<DigestScene />
			</Sequence>
			<Sequence from={330} durationInFrames={120}>
				<OpenDraftScene />
			</Sequence>
			<Sequence from={450} durationInFrames={120}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};

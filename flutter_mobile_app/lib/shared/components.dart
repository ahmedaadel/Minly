import 'dart:io';
import 'package:flutter/material.dart';
import 'package:chewie/chewie.dart';
import 'package:video_player/video_player.dart';
import 'package:path_provider/path_provider.dart';


Widget buildVideoPlayer(List<int> videoContent) {
  return FutureBuilder<String>(
    future: _createTempVideoFile(videoContent),
    builder: (context, snapshot) {
      if (snapshot.connectionState == ConnectionState.waiting) {
        return const CircularProgressIndicator();
      }
      if (snapshot.hasError) {
        return Text('Error: ${snapshot.error}');
      }
      // Initialize a video player controller with the file path
      VideoPlayerController videoPlayerController =
      VideoPlayerController.file(File(snapshot.data!));
      ChewieController chewieController = ChewieController(
        videoPlayerController: videoPlayerController,
        autoPlay:
        false, // Set autoPlay to true if you want the video to play automatically
        looping: false, // Set looping to true if you want the video to loop
        allowFullScreen: true,
      );
      return Chewie(controller: chewieController);
    },
  );
}

Future<String> _createTempVideoFile(List<int> videoContent) async {
  final tempDir = await getTemporaryDirectory();
  final tempPath = '${tempDir.path}/temp_video.mp4';
  final file = File(tempPath);
  await file.writeAsBytes(videoContent);
  return tempPath;
}
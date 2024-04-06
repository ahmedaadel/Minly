import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mobile_app/shared/components.dart';
import 'package:flutter_mobile_app/shared/cubit/cubit.dart';
import 'package:flutter_mobile_app/shared/cubit/status.dart';
import 'package:image_picker/image_picker.dart';


class HomeLayout extends StatefulWidget {
  const HomeLayout({super.key});

  @override
  State<HomeLayout> createState() => _HomeLayoutState();
}

class _HomeLayoutState extends State<HomeLayout> {
  @override
  Widget build(BuildContext context) {
    final ImagePicker picker = ImagePicker();

    void showUploadOptions(BuildContext context,AppCubit cubit) {
      showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return Container(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                ListTile(
                  leading: const Icon(Icons.image),
                  title: const Text('Upload Image'),
                  onTap: () {
                    Navigator.pop(context);
                    cubit.uploadMedia(true, picker, "media");
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.videocam),
                  title: const Text('Upload Video'),
                  onTap: () {
                    Navigator.pop(context);
                    cubit.uploadMedia(false, picker, "media");
                  },
                ),
              ],
            ),
          );
        },
      );
    }

    return BlocConsumer<AppCubit, States>(
      listener: (context, state) {},
      builder: (context, state) {
        var cubit = AppCubit.get(context);
        return Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.red,
            title: const Text(
              "Minly",
              style: TextStyle(fontSize: 25, color: Colors.white),
            ),
            centerTitle: true,
          ),
          body: ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: cubit.posts.length,
            itemBuilder: (context, index) {
              var post = cubit.posts[index];
              return Card(
                shape: RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(10.0), // Adjust the value as needed
                ),
                clipBehavior: Clip.antiAlias,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (cubit.posts[index].media_type == "image")
                      Image.memory(
                        Uint8List.fromList(List<int>.from(post.content)),
                        fit: BoxFit.cover,
                      ),
                    if (post.media_type == "video")
                      Container(
                          height: 200,
                          width: double.infinity,
                          child: buildVideoPlayer(
                              List<int>.from(cubit.posts[index].content))),
                    const SizedBox(height: 10.0),
                    IconButton(
                      onPressed: () {
                        cubit.likeOrUnlikePost(
                            "media",
                            {"isliked": post.isliked == 0 ? true : false},
                            post.id);
                        post.isliked = post.isliked == 0 ? 1 : 0;
                      },
                      icon: Icon(
                        cubit.posts[index].isliked == 1
                            ? Icons.favorite
                            : Icons.favorite_border,
                        color: cubit.posts[index].isliked == 1
                            ? Colors.red
                            : Colors.grey,
                      ),
                    )
                  ],
                ),
              );
            },
          ),
          floatingActionButton: FloatingActionButton(
            backgroundColor: Colors.red,
            onPressed: () {
              showUploadOptions(context,cubit);
            },
            child: const Icon(Icons.add_a_photo, color: Colors.white),
          ),
        );
      },
    );
  }
}


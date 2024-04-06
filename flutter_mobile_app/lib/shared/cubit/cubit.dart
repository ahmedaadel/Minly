import 'dart:convert';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mobile_app/Models/media_content.dart';
import 'package:flutter_mobile_app/shared/cubit/status.dart';
import 'package:flutter_mobile_app/shared/network/api.dart';
import 'package:image_picker/image_picker.dart';

class AppCubit extends Cubit<States>
{
  AppCubit() : super(AppInitialState());
  static AppCubit get(context) => BlocProvider.of<AppCubit>(context);

   List<Media> posts = [];

  void getPosts(url) {
    posts = [];

    emit(LoadDataFromAPIState()); // loading getting data
    API.getDate(url: '$url').then((value) {
      posts = (value.data as List<dynamic>)
          .map((item) => Media.fromJson(item))
          .toList();
      emit(GetDataFromAPISuccessState()); //success state
    }).catchError((error) {
      print(error);
      emit(GetDataFromAPIFailedState()); // error state
    });
  }

  void likeOrUnlikePost(url,Map<String,dynamic> queryParameter,int id) {
    API.putData(url: '$url/$id',query: queryParameter).then((value) {
      emit(PutDataAPISuccessState()); //success state
    }).catchError((error) {
      print(error);
      emit(PutDataAPIFailedState()); // error state
    });
  }

  void uploadMedia(bool isImage, ImagePicker picker, String url) async {
    XFile? pickedFile;
    if (isImage) {
      pickedFile = await picker.pickImage(source: ImageSource.gallery);
    } else {
      pickedFile = await picker.pickVideo(source: ImageSource.gallery);
    }
    if (pickedFile != null) {

      Uint8List imageBytes = await pickedFile.readAsBytes();
      String base64Content = base64Encode(imageBytes);
      Map <String, dynamic> data= {
        'content': base64Content,
        'media_type': isImage ? 'image' : 'video',
      };

      try {
        Response response = await API.postData(url: url, data: data);
        getPosts(url);
        emit(PostDataAPISuccessState()); //success st
        print('Upload successful: ${response.statusCode}');
      } catch (error) {
        emit(PostDataAPIFailedState()); //success st
        print('Upload failed: $error');
      }
    }
  }

}
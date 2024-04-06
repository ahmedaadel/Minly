import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mobile_app/homeLayout.dart';
import 'package:flutter_mobile_app/shared/cubit/cubit.dart';
import 'package:flutter_mobile_app/shared/cubit/status.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => AppCubit(),
        ),
        BlocProvider(create:(context)=> AppCubit()..getPosts("media") )
      ],
      child: BlocConsumer<AppCubit, States>(
        listener: (context, state) {},
        builder: (context, state) => const MaterialApp(
          debugShowCheckedModeBanner: false,
          home: HomeLayout(),
        ),
      ),
    );
  }
}




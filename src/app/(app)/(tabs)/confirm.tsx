/* eslint-disable max-lines-per-function */
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from '@react-navigation/native';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import React from 'react';
import { Controller, type SubmitHandler, useFieldArray,useForm } from "react-hook-form";
import { Button, KeyboardAvoidingView, Platform, SafeAreaView,ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import AppGradient from '@/components/app-gradient';
import { colors, View } from '@/components/ui';
import { HOME_ICONS_DATA, type HomeIconsType, LANGUAGE } from '@/constants/home-icons-data';
import { type AttendeesType } from '@/types';

const Confirm = () => {
  const route = useRoute();
  const data: HomeIconsType = HOME_ICONS_DATA.filter(x => x.slug === route.name)[0];

  const {/*register, setValue,*/
    handleSubmit,
    control, /*reset,*/
    formState: { errors },
  } = useForm<AttendeesType>({
    defaultValues: {
      "attendees": [{
        "name": "",
        "surname": "",
      }]
    }
  });
  // Create the array field Input
  const { fields, append, remove, /*prepend, swap, move, insert*/ } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "attendees", // unique name for your Field Array
  });
  const addAttendee = () => {
    append({ name: "", surname: ""});
  }
  const removeAttendee = (index: number) => {
    if(fields.length > 1) remove(index);
  }
  const onSubmit: SubmitHandler<AttendeesType> = async (data) => {
    console.log('Submitted Data:', JSON.stringify(data));
    try {
      const attendeesCollection = collection(getFirestore(), 'attendees')
      data.attendees.forEach((attendee) => {
        //addDoc(attendeesCollection, attendee);
        setDoc(doc(attendeesCollection, attendee.name + attendee.surname), attendee)
      });
      console.log('Ref added!');
    } catch (error) {
      console.error(error);
    }
  };
  if(Object.keys(errors).length > 0) console.log("Errors: ", JSON.stringify(errors));
  return (
    <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AppGradient 
          colors={['#ffffff', `${colors.primary[100]}`, `${colors.secondary[900]}`]}
          title={data.title_ES}
        >
          <View className='relative h-full pt-4'>
              {/* This is how you comment in JSX */}
              {/* https://echobind.com/post/react-hook-form-for-react-native and ChatGPT */}
            <ScrollView className='flex-1'>
              {fields.map((attendee, index) => (
                <View key={attendee.id} className='flex flex-row pl-4 pt-3'>
                  <Controller
                    control={control}
                    name={`attendees.${index}.name`} // Dynamic name for the attendee
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput 
                        key={attendee.id} // not {index} https://react-hook-form.com/docs/usefieldarray
                        className="mb-2 h-10 w-1/3 rounded border-transparent bg-white p-2"
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        value={value}
                        placeholder={LANGUAGE === 'ES' ? 'Nombre' : 'Prénom'}
                      />
                    )}
                  />
                  <Controller 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput 
                      className="mb-2 ml-5 h-10 w-2/5 rounded border-transparent bg-white p-2"
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        value={value}
                        placeholder={LANGUAGE === 'ES' ? 'Apellidos' : 'Nom'}
                      />
                    )}
                    name={`attendees.${index}.surname`} // Dynamic name for the attendee
                    rules={{ required: true }}
                  />
                  <TouchableOpacity 
                    className='m-auto justify-center' 
                    onPress={(() => removeAttendee(index))} // Remove attendee input
                  >
                    <FontAwesome6 name="delete-left" size={24} color="red" 
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <SafeAreaView className='mb-2 w-full'>
              <View className={`bg-[ mt-4 h-12 color-white${Colors.segundary}] rounded`}>
                <Button 
                  disabled={fields.length >= 7}
                  color='white'
                  title={LANGUAGE==='ES'?"Añadir invitado":"Ajouter invité"}
                  onPress={addAttendee} // Add new attendee input
                />
              </View>
              <View className={`bg-[ mt-2 h-12 color-white${Colors.segundaryDark}] rounded`}>
                <Button
                  color='white'
                  title={LANGUAGE==='ES'?"Confirmar":"Confirmer"}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </SafeAreaView>
          </View>
        </AppGradient>
    </KeyboardAvoidingView>
  )
};

export default Confirm;

      /*await firstProduct.add({
        id: id,
        name: name,
      });*/
      // update firstProduct object
      //await setDoc(firstProduct, { id: id, name: name })
      // add new doc=record

      /*
      //You can create batch write like
      var db = firebase.firestore();
      var batch = db.batch()
      
      //in you array add updates
      array.forEach((doc) => {
        var docRef = db.collection("col").doc(); //automatically generate unique id
        batch.set(docRef, doc);
      });

      //finally you have to commit that
      batch.commit()
      */

        /*const removeAttendee = (i: number) => {
    setAttendees(attendees.filter(x => x.id != i));
  }*/

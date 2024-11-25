export type AttendeesType = {
  attendees: {
    name: string
    surname: string
  }[]
};

export type SignUpData = {
  name: string,
  surname?: string,
  email: string,
  password: string,
}

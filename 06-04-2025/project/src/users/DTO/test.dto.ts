import { IsEmpty, IsNotEmpty } from 'class-validator';

export class check {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
}

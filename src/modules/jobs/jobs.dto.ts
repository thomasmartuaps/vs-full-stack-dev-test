import { Reporter } from '../reporters/reporters.entity';

export class CreateJobDto {
  readonly case_name!: string;
  readonly duration!: string;
  readonly location!: 'physical' | 'remote';
  readonly status!:
    | 'NEW'
    | 'ASSIGNED'
    | 'TRANSCRIBED'
    | 'REVIEWED'
    | 'COMPLETED';
}

export class UpdateStatusDto {
  readonly id!: number;
}

export class AssignJobDto {
  readonly reporter!: Reporter;
  readonly id!: number;
}

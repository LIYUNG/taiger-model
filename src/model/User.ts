import { Schema } from 'mongoose';
import validator from 'validator';

import { Role } from '../constants/users';
import { PROGRAM_SUBJECT_KEYS } from './Program';
import { IDocumentthread } from './Documentthread';

// --- Interfaces for frontend/backend type reference ---
export enum DocumentStatusType {
  Uploaded = 'uploaded',
  Missing = 'missing',
  Accepted = 'accepted',
  Rejected = 'rejected',
  NotNeeded = 'notneeded'
}

export interface IUserNotification {
  isRead_survey_not_complete?: boolean;
  isRead_uni_assist_task_assigned?: boolean;
  isRead_new_agent_assigned?: boolean;
  isRead_new_editor_assigned?: boolean;
  isRead_new_cvmlrl_tasks_created?: boolean;
  isRead_new_cvmlrl_messsage?: boolean;
  isRead_base_documents_missing?: boolean;
  isRead_base_documents_rejected?: boolean;
  isRead_new_programs_assigned?: boolean;
}

export interface IUserTaigeraiFile {
  name?: string;
  status?: string;
  file_category?: string;
  path?: string;
  updatedAt?: Date;
}

export interface IUserTaigeraiFeedback {
  message?: string;
  updatedAt?: Date;
}

export interface IUserTaigerai {
  input?: IUserTaigeraiFile;
  output?: IUserTaigeraiFile;
  feedback?: IUserTaigeraiFeedback;
}

export interface IUserApplicationPreference {
  expected_application_date?: string;
  expected_application_semester?: string;
  target_program_language?: string;
  target_application_field?: string;
  targetApplicationSubjects?: string[];
  target_degree?: string;
  considered_privat_universities?: string;
  special_wished?: string;
  application_outside_germany?: string;
  updatedAt?: Date;
}

export interface IUserAcademicBackgroundUniversity {
  high_school_isGraduated?: string;
  attended_high_school?: string;
  high_school_graduated_year?: string;
  attended_university?: string;
  attended_university_program?: string;
  isGraduated?: string;
  expected_grad_date?: string;
  Highest_GPA_Uni?: number;
  Passing_GPA_Uni?: number;
  My_GPA_Uni?: number;
  Has_Exchange_Experience?: string;
  isSecondGraduated?: string;
  expectedSecondDegreeGradDate?: string;
  attendedSecondDegreeUniversity?: string;
  attendedSecondDegreeProgram?: string;
  highestSecondDegreeGPA?: number;
  passingSecondDegreeGPA?: number;
  mySecondDegreeGPA?: number;
  Has_Internship_Experience?: string;
  Has_Working_Experience?: string;
  updatedAt?: Date;
}

export interface IUserAcademicBackgroundLanguage {
  english_isPassed?: string;
  english_certificate?: string;
  english_score?: string;
  english_score_reading?: string;
  english_score_listening?: string;
  english_score_writing?: string;
  english_score_speaking?: string;
  english_test_date?: string;
  german_isPassed?: string;
  german_certificate?: string;
  german_score?: string;
  german_test_date?: string;
  gre_isPassed?: string;
  gre_certificate?: string;
  gre_score?: string;
  gre_test_date?: string;
  gmat_isPassed?: string;
  gmat_certificate?: string;
  gmat_score?: string;
  gmat_test_date?: string;
  updatedAt?: Date;
}

export interface IUserAcademicBackground {
  university?: IUserAcademicBackgroundUniversity;
  language?: IUserAcademicBackgroundLanguage;
}

export interface IUserAttribute {
  value: number;
  name: string;
}

export interface IUser {
  role?: string;
  firstname?: string;
  firstname_chinese?: string;
  lastname?: string;
  lastname_chinese?: string;
  email?: string;
  pictureUrl?: string;
  password?: string;
  archiv?: boolean;
  birthday?: string;
  linkedIn?: string;
  lineId?: string;
  isAccountActivated?: boolean;
  notification?: IUserNotification;
  taigerai?: IUserTaigerai;
  application_preference?: IUserApplicationPreference;
  academic_background?: IUserAcademicBackground;
  lastLoginAt?: Date;
}

export interface IUserProfileItem {
  name: string;
  status?: string;
  required: boolean;
  path?: string;
  feedback?: string;
  updatedAt?: Date;
}

export interface IUserGeneraldocsThread {
  isFinalVersion?: boolean;
  latest_message_left_by_id?: IUser | Schema.Types.ObjectId | string;
  doc_thread_id?: IDocumentthread | Schema.Types.ObjectId | string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IStudent extends IUser {
  agents?: IAgent[] | Schema.Types.ObjectId[] | string[];
  editors?: IEditor[] | Schema.Types.ObjectId[] | string[];
  needEditor?: boolean;
  applying_program_count?: number;
  attributes?: IUserAttribute[];
  profile?: IUserProfileItem[];
  generaldocs_threads?: IUserGeneraldocsThread[];
}

export interface IUserOfficeHoursDay {
  active?: boolean;
  time_slots?: unknown[];
}

export interface IAgentNotificationItem {
  student_id?: string;
  student_firstname?: string;
  student_lastname?: string;
}

export interface IAgent extends IUser {
  timezone?: string;
  officehours?: Record<string, IUserOfficeHoursDay>;
  selfIntroduction?: string;
  agent_notification?: {
    isRead_new_base_docs_uploaded?: IAgentNotificationItem[];
    isRead_new_survey_updated?: boolean;
    isRead_applications_status_changed?: boolean;
    isRead_new_programs_assigned?: boolean;
  };
}

export interface IEditor extends IUser {
  timezone?: string;
  officehours?: Record<string, IUserOfficeHoursDay>;
  editor_notification?: {
    isRead_survey_not_complete?: boolean;
    isRead_base_documents_missing?: boolean;
    isRead_base_documents_rejected?: boolean;
    isRead_new_programs_assigned?: boolean;
  };
  attribute?: {
    can_write_ml?: boolean;
    can_write_rl?: boolean;
    can_write_cv?: boolean;
    can_write_essay?: boolean;
    can_do_interview?: boolean;
  };
}

export interface IManager extends IUser {
  agents?: Schema.Types.ObjectId[];
  editors?: Schema.Types.ObjectId[];
  manager_type?: string;
  manager_notification?: {
    isRead_new_base_docs_uploaded?: { student_id?: string }[];
    isRead_new_programs_assigned?: boolean;
  };
  attribute?: {
    can_write_ml?: boolean;
    can_write_rl?: boolean;
    can_write_cv?: boolean;
    can_write_essay?: boolean;
    can_do_interview?: boolean;
  };
}

export interface IExternal extends IUser {
  attribute?: {
    can_update_program_list?: boolean;
    can_update_course_analysis?: boolean;
    can_add_articles?: boolean;
  };
}

export const ManagerType = {
  Agent: 'Agent',
  Editor: 'Editor',
  AgentAndEditor: 'AgentAndEditor',
  None: 'None'
};

export const options = { discriminatorKey: 'role', timestamps: true };

export const attributeSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

export const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: Object.values(Role),
      required: true
    },
    firstname: {
      type: String,
      trim: true
    },
    firstname_chinese: {
      type: String,
      trim: true
    },
    lastname: {
      type: String,
      trim: true
    },
    lastname_chinese: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email address']
    },
    pictureUrl: {
      type: String
    },
    password: {
      type: String,
      select: false,
      trim: true,
      minlength: [8, 'Password must contain at least 8 characters']
    },
    archiv: { type: Boolean, default: false },
    birthday: {
      type: String,
      default: ''
    },
    linkedIn: String,
    lineId: String,
    isAccountActivated: {
      type: Boolean,
      default: false
    },
    notification: {
      isRead_survey_not_complete: {
        type: Boolean,
        default: false
      },
      isRead_uni_assist_task_assigned: {
        type: Boolean,
        default: false
      },
      isRead_new_agent_assigned: {
        type: Boolean,
        default: true
      },
      isRead_new_editor_assigned: {
        type: Boolean,
        default: true
      },
      isRead_new_cvmlrl_tasks_created: {
        type: Boolean,
        default: true
      },
      isRead_new_cvmlrl_messsage: {
        type: Boolean,
        default: true
      },
      isRead_base_documents_missing: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_rejected: {
        type: Boolean,
        default: true
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    taigerai: {
      input: {
        name: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        file_category: {
          type: String,
          default: 'Others'
        },
        path: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      },
      output: {
        name: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        file_category: {
          type: String,
          default: 'Others'
        },
        path: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      },
      feedback: {
        message: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      }
    },
    application_preference: {
      expected_application_date: {
        type: String,
        default: ''
      },

      expected_application_semester: {
        type: String,
        default: ''
      },
      target_program_language: {
        type: String,
        default: ''
      },
      // To be deprecated -> read only in frontend
      target_application_field: {
        type: String,
        default: ''
      },
      targetApplicationSubjects: [
        {
          type: String,
          enum: PROGRAM_SUBJECT_KEYS
        }
      ],
      target_degree: {
        type: String,
        default: ''
      },
      considered_privat_universities: {
        type: String,
        default: '-'
      },
      special_wished: {
        type: String,
        default: ''
      },
      application_outside_germany: {
        type: String,
        default: '-'
      },
      updatedAt: Date
    },
    academic_background: {
      university: {
        high_school_isGraduated: {
          type: String,
          default: ''
        },
        attended_high_school: {
          type: String,
          default: ''
        },
        high_school_graduated_year: {
          type: String,
          default: ''
        },
        attended_university: {
          type: String,
          default: ''
        },
        attended_university_program: {
          type: String,
          default: ''
        },
        isGraduated: {
          type: String,
          default: '-'
        },
        expected_grad_date: {
          type: String,
          default: ''
        },
        Highest_GPA_Uni: {
          type: Number
        },
        Passing_GPA_Uni: {
          type: Number
        },
        My_GPA_Uni: {
          type: Number
        },
        Has_Exchange_Experience: {
          type: String,
          default: '-'
        },
        isSecondGraduated: {
          type: String,
          default: '-'
        },
        expectedSecondDegreeGradDate: {
          type: String,
          default: ''
        },
        attendedSecondDegreeUniversity: {
          type: String,
          default: ''
        },
        attendedSecondDegreeProgram: {
          type: String,
          default: ''
        },
        highestSecondDegreeGPA: {
          type: Number
        },
        passingSecondDegreeGPA: {
          type: Number
        },
        mySecondDegreeGPA: {
          type: Number
        },
        Has_Internship_Experience: {
          type: String,
          default: '-'
        },
        Has_Working_Experience: {
          type: String,
          default: '-'
        },
        updatedAt: Date
      },
      language: {
        english_isPassed: {
          type: String,
          default: '-'
        },
        english_certificate: {
          type: String,
          default: ''
        },
        english_score: {
          type: String,
          default: ''
        },
        english_score_reading: {
          type: String,
          default: ''
        },
        english_score_listening: {
          type: String,
          default: ''
        },
        english_score_writing: {
          type: String,
          default: ''
        },
        english_score_speaking: {
          type: String,
          default: ''
        },
        english_test_date: {
          type: String,
          default: ''
        },
        german_isPassed: {
          type: String,
          default: '-'
        },
        german_certificate: {
          type: String,
          default: ''
        },
        german_score: {
          type: String,
          default: ''
        },
        german_test_date: {
          type: String,
          default: ''
        },
        gre_isPassed: {
          type: String,
          default: '-'
        },
        gre_certificate: {
          type: String,
          default: ''
        },
        gre_score: {
          type: String,
          default: ''
        },
        gre_test_date: {
          type: String,
          default: ''
        },
        gmat_isPassed: {
          type: String,
          default: '-'
        },
        gmat_certificate: {
          type: String,
          default: ''
        },
        gmat_score: {
          type: String,
          default: ''
        },
        gmat_test_date: {
          type: String,
          default: ''
        },
        updatedAt: Date
      }
    },
    lastLoginAt: Date
  },
  options
);

export const studentSchema = new Schema(
  {
    agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }],
    editors: [{ type: Schema.Types.ObjectId, ref: 'Editor' }],
    needEditor: { type: Boolean, default: false },
    applying_program_count: {
      type: Number,
      default: 0
    },
    attributes: [
      {
        type: attributeSchema,
        required: true
      }
    ],
    profile: [
      {
        name: {
          type: String,
          required: true
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        required: {
          type: Boolean,
          required: true
        },
        path: {
          type: String,
          default: ''
        },
        feedback: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      }
    ],
    generaldocs_threads: [
      {
        isFinalVersion: {
          type: Boolean,
          default: false
        },
        latest_message_left_by_id: {
          type: String,
          default: ''
        },
        doc_thread_id: { type: Schema.Types.ObjectId, ref: 'Documentthread' },
        updatedAt: Date,
        createdAt: Date
      }
    ]
  },
  options
);

export const externalSchema = new Schema(
  {
    attribute: {
      can_update_program_list: {
        type: Boolean,
        default: false
      },
      can_update_course_analysis: {
        type: Boolean,
        default: false
      },
      can_add_articles: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

export const managerSchema = new Schema(
  {
    agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }],
    editors: [{ type: Schema.Types.ObjectId, ref: 'Editor' }],
    manager_type: {
      type: String,
      enum: Object.values(ManagerType),
      default: ManagerType.None
    },
    manager_notification: {
      isRead_new_base_docs_uploaded: [
        {
          student_id: {
            type: String,
            default: ''
          }
        }
      ],
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    attribute: {
      can_write_ml: {
        type: Boolean,
        default: false
      },
      can_write_rl: {
        type: Boolean,
        default: false
      },
      can_write_cv: {
        type: Boolean,
        default: false
      },
      can_write_essay: {
        type: Boolean,
        default: false
      },
      can_do_interview: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

const officehours = {
  Monday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Tuesday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Wednesday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Thursday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Friday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Saturday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Sunday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  }
};

export const agentSchema = new Schema(
  {
    timezone: { type: String, default: '' },
    officehours: officehours,
    selfIntroduction: {
      type: String,
      default: ''
    },
    agent_notification: {
      isRead_new_base_docs_uploaded: [
        {
          student_id: {
            type: String,
            default: ''
          },
          student_firstname: {
            type: String,
            default: ''
          },
          student_lastname: {
            type: String,
            default: ''
          }
        }
      ],
      isRead_new_survey_updated: {
        type: Boolean,
        default: true
      },
      isRead_applications_status_changed: {
        type: Boolean,
        default: true
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

export const editorSchema = new Schema(
  {
    timezone: { type: String, default: '' },
    officehours: officehours,
    editor_notification: {
      isRead_survey_not_complete: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_missing: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_rejected: {
        type: Boolean,
        default: false
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    attribute: {
      can_write_ml: {
        type: Boolean,
        default: false
      },
      can_write_rl: {
        type: Boolean,
        default: false
      },
      can_write_cv: {
        type: Boolean,
        default: false
      },
      can_write_essay: {
        type: Boolean,
        default: false
      },
      can_do_interview: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

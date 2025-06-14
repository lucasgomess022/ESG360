CREATE TABLE "evaluations" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_name" varchar NOT NULL,
	"submission_date" timestamp DEFAULT now(),
	"answers" jsonb NOT NULL,
	"environmental_score" integer NOT NULL,
	"social_score" integer NOT NULL,
	"governance_score" integer NOT NULL,
	"environmental_classification" varchar NOT NULL,
	"social_classification" varchar NOT NULL,
	"governance_classification" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '62479ab9-3f40-4ccf-9c28-b5eff7249b26', '2022-10-15 16:07:54.830144');
INSERT INTO public.sessions VALUES (2, 2, 'a471ea9c-40fb-4993-a64a-cd6592744702', '2022-10-15 19:38:24.228019');
INSERT INTO public.sessions VALUES (3, 3, 'c6f69e11-653b-47c4-ac65-b1ba70e94c91', '2022-10-16 21:07:12.899305');
INSERT INTO public.sessions VALUES (4, 4, 'caa2746c-4a31-40d2-a13b-3c4ae14bced1', '2022-10-16 21:08:15.280592');
INSERT INTO public.sessions VALUES (5, 5, 'aabf22d1-029f-4505-9bae-60ac0d4a0434', '2022-10-16 21:09:05.600181');
INSERT INTO public.sessions VALUES (6, 6, '454249bd-1c7d-434b-974f-5ff939e8afbe', '2022-10-16 21:11:10.37414');
INSERT INTO public.sessions VALUES (7, 7, 'de3e8fe8-64f2-4e84-952c-2e7a9c2841fc', '2022-10-16 21:22:24.067532');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 1, '29df31', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 0, '2022-10-15 17:22:29.220344');
INSERT INTO public.urls VALUES (4, 1, 'c27b9a', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 0, '2022-10-15 18:13:18.872389');
INSERT INTO public.urls VALUES (5, 1, '457c35', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 0, '2022-10-15 18:13:36.857808');
INSERT INTO public.urls VALUES (7, 1, '9d829c', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 0, '2022-10-15 19:45:51.82771');
INSERT INTO public.urls VALUES (6, 1, '4edb1e', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 1, '2022-10-15 18:13:53.682028');
INSERT INTO public.urls VALUES (8, 2, 'c36894', 'https://acervolima.com/como-verificar-se-uma-determinada-string-e-um-url-absoluto-ou-nao-em-javascript/', 2, '2022-10-15 19:46:14.155069');
INSERT INTO public.urls VALUES (9, 2, '3f5c01', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 1, '2022-10-16 20:52:06.166704');
INSERT INTO public.urls VALUES (14, 4, '5446c2', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 20, '2022-10-16 21:08:33.995342');
INSERT INTO public.urls VALUES (15, 5, '845495', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:09:23.362162');
INSERT INTO public.urls VALUES (10, 3, 'b2cc15', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 18, '2022-10-16 21:07:44.043247');
INSERT INTO public.urls VALUES (11, 4, '2acc1d', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:08:32.279492');
INSERT INTO public.urls VALUES (12, 4, 'd41218', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:08:32.888149');
INSERT INTO public.urls VALUES (13, 4, 'ee7f43', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:08:33.44129');
INSERT INTO public.urls VALUES (16, 5, '7a0705', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:09:24.679064');
INSERT INTO public.urls VALUES (17, 5, '6310d3', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:09:25.058639');
INSERT INTO public.urls VALUES (18, 5, '75069d', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 4, '2022-10-16 21:09:25.586751');
INSERT INTO public.urls VALUES (19, 6, '9f2f58', 'https://learn.microsoft.com/pt-br/office/client-developer/access/desktop-database-reference/left-join-right-join-operations-microsoft-access-sql', 0, '2022-10-16 21:11:23.452942');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$18B/oeH3mtsc/I/lpaiGVOI6OZN0hY1Cx78.DiAn6.Wh.RoumEVpu', '2022-10-15 16:07:48.790974');
INSERT INTO public.users VALUES (2, 'Pedro', 'pedro@driven.com.br', '$2b$10$9NIktJZr7QOFul5DyBeVkOmD8yNLR7rrGLT7a1bVLax/4Ix.a9kmC', '2022-10-15 19:38:03.168367');
INSERT INTO public.users VALUES (3, 'Renata', 'renata@driven.com.br', '$2b$10$fkZxKIkSP0J2HKRjlQC9E.mhRO658BYTwWl1/U7f72hT15p./p7pG', '2022-10-16 21:07:06.390433');
INSERT INTO public.users VALUES (4, 'Julia', 'julia@driven.com.br', '$2b$10$BYUeSFZKzWl9wX0a733xG.rlAdhs.xnlGhMac0k23BAdeG8r4FyfW', '2022-10-16 21:08:09.212176');
INSERT INTO public.users VALUES (5, 'pepino', 'pepino@driven.com.br', '$2b$10$S8LbsdQgeObcJSptsengs.1pYtR0ONdLFfh4tiz73AFjltilyncLS', '2022-10-16 21:08:58.652388');
INSERT INTO public.users VALUES (6, 'bebaagua', 'bebaagua@driven.com.br', '$2b$10$fuORm/0s6SIFUQkvdk5oiuCW5vry5ChKaqtoXyoEooJOHFVrV3Yp.', '2022-10-16 21:11:05.039401');
INSERT INTO public.users VALUES (7, 'comafruta', 'comafruta@driven.com.br', '$2b$10$Y2f5pwtUT.sVp1Ij59tn5OHXjZUW73eX0huOLjKJkrVubP7WUf29m', '2022-10-16 21:12:06.113584');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 7, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


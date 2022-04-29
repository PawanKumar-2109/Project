const client = require('./connection');


exports.signup = async (req,res) => {
    let query = `insert into users (name,email,password,role) values ('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.role}')`;
    let result = await client.query(query);
    res.send("Signed Up Successfully");
}

exports.login = async (req,res) => {
    let query = `select role from users where email = '${req.body.email}' and password = '${req.body.password}'`;
    let result = await client.query(query);
    res.send(result.rows);
}


exports.question = async (req,res) => {
    let query = 'select count(distinct id) from question';
    let total_questions = await client.query(query);
    total_questions = parseInt(total_questions.rows[0].count);
    query = `select id,description from question limit ${req.query.limit} offset ${req.query.skip};`;
    let result = await client.query(query);
    res.send({
        next_skip : (parseInt(req.query.skip)+parseInt(req.query.limit))%total_questions,
        prev_skip : (parseInt(req.query.skip)-parseInt(req.query.limit)+total_questions)%total_questions,
        matches : result.rows
    });
}


exports.add = async (req,res) => {
    let query = 'select count(distinct id) from question';
    let total_questions = await client.query(query);
    total_questions = parseInt(total_questions.rows[0].count);
    query = `insert into question (id,description,answer,level) values (${total_questions+1},'${req.body.description}','${req.body.answer}','${req.body.level}')`;
    let result = await client.query(query);
    query = `insert into tags (id,tag) values (${total_questions+1},'${req.body.tag}')`;
    result = await client.query(query);
    res.send({
        success:1
    })
}

exports.generate = async (req,res) => {
    let query = `select * from question natural join tags where level = 'easy' and tag = '${req.body.tag}' order by random() limit ${req.body.easy}`;
    let easy = await client.query(query);
    query = `select * from question natural join tags where level = 'medium' and tag = '${req.body.tag}' order by random() limit ${req.body.medium}`;
    let medium = await client.query(query);
    query = `select * from question natural join tags where level = 'hard' and tag = '${req.body.tag}' order by random() limit ${req.body.hard}`;
    let hard = await client.query(query);
    res.send({
        easy:easy.rows,
        medium:medium.rows,
        hard:hard.rows
    })
}

exports.details = async (req,res)=>{
    let query = `select * from question natural join tags where id = ${req.query.id}`;
    let result = await client.query(query);
    res.send({
        detail:result.rows[0]
    })
}

exports.list_tags = async (req,res)=>{
    let query = 'select distinct tag from tags';
    let result = await client.query(query);
    res.send({
        list_tag:result.rows
    })
}
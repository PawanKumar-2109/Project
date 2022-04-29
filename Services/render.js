const axios = require('axios');

exports.homepage = (req,res) => {
    res.render('homepage');
}

exports.signup = (req,res) => {
    axios.post('http://localhost:3000/api/signup',req.body)
    .then(function(result){
        res.redirect('/');
    }).catch(err=>{
        res.send(err);
    })
}

exports.login = async (req,res) => {
    let result = await axios.post('http://localhost:3000/api/login',req.body);
    if(result.data.length == 0){
        res.redirect('/');
    }else{
        req.session.role = result.data[0].role;
        if(req.session.role == "Student"){
            res.render('student_dashboard');
        }else{
            res.render('faculty_dashboard');
        }
    }
}

exports.generate = async (req,res) => {
    if(req.session.role =="Student"){
        res.render('/');
        return ;
    }
    let _res = await axios.post('http://localhost:3000/api/generate',req.body);
    let result = _res.data;
    res.render('generated_paper',{
        easy:result.easy,
        medium:result.medium,
        hard:result.hard
    })
}

exports.add = async (req,res) => {
    let _res = await axios.post('http://localhost:3000/api/add',req.body);
    res.redirect('/add');
}

exports.question = async (req,res) => {
    if(!req.query.skip){
        req.query.skip = 0;
    }
    let _res = await axios.get('http://localhost:3000/api/question',{params:{
        limit:20,
        skip:req.query.skip
    }});
    res.render('question',{
        next_skip:_res.data.next_skip,
        prev_skip:_res.data.prev_skip,
        matches:_res.data.matches
    })
}

exports.details = async (req,res) => {
    let result = await axios.get('http://localhost:3000/api/details',{
        params:{
            id:req.query.id
        }
    })
    res.render('question_detail',{
        detail:result.data.detail
    })
}

exports.question_add = async (req,res)=> { 
    if(req.session.role =="Student"){
        res.render('/');
        return ;
    }
    let result = await axios.get('http://localhost:3000/api/tags');
    res.render('question_add',{
        mylist:result.data.list_tag
    })
}

exports.get_generate = async (req,res)=>{
    if(req.session.role =="Student"){
        res.render('/');
        return ;
    }
    let result = await axios.get('http://localhost:3000/api/tags');
    res.render('paper_generator',{
        mylist:result.data.list_tag
    })
}
const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecret';

module.exports = {
    async index(req,res) {
        const user = await User.find();
        res.json(user);
    },

    async create(req,res) {
        const { userName, userEmail, userType, userPassword} = req.body;

        let data = {};
        let user = await User.findOne({userEmail});
        
        if(!user){
            data = { userName, userEmail, userType, userPassword };
            user = await User.create(data);
            return res.status(200).json(user);
        }
        else{
            return res.status(500).json({message:'Email already exists!'});
        } 
    },

    async datails(req,res) {
        const user = await User.findOne({ _id: req.params._id });
        res.json(user);
    },

    async delete(req,res) {
        const user = await User.findByIdAndDelete({_id: req.params._id});
        res.status(204).send();
    },

    async update(req, res) {
        const userId = req.params._id;
        const { userName, userEmail, userType, userPassword } = req.body;
        const data = { userName, userEmail, userType, userPassword };
        const user = await User.findOneAndUpdate({userId}, data, {new:true});
        res.json(user);
    },

    async login(req, res) {
        const {email, password} = req.body;
        User.findOne({ userEmail: email, userType: 1 }, function(err,user) {
            if(err) {
                console.log(err);
                res.status(200).json({erro: 'Error on the server. Please try again!'});
            } else if (!user){
                res.status(200).json({status: 2, error:'Email not registered'});
            } else {
                user.isCorrectPassword(password, async function(err, same){
                    if(err){
                        res.status(200).json({error: 'Error on the server. Please try again!'});
                    }else if(!same){
                        res.status(200).json({status:2, error: 'Invalid password'});
                    }else{
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '10m'
                        });
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status:1, auth:true, token:token, id_client:user._id, user_name:user.userName, user_type:user.userType});
                    };
                });
                
            };
        });
    },

    async checkToken(req, res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-acess-token'];
        req.token = token;
        if(!token){
            res.json({status:401, msg: 'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401, msg: 'Não autorizado: Token inválido!'});
                }else{
                    req.email = decoded.email;
                    res.json({status:200});
                };
            });
        };
    },

    async destroyToken(req, res){
        const token = req.headers.token;
        if(token){
            res.cookie('token', null, {httpOnly:true});
        }else{
            res.status(401).send('Logout Não autorizado!');
        }
        res.send('Sessão finalizada com sucesso!');
    },
};
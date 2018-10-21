$(document).ready(
    function(){
        $(document).on('keypress', '#username', function(event){
            if (event.which === 13){
                var input = $(this);
                var username = input.val();
            }
        })
    }
)

function getGitHubInfo(username) {
    var url = 'https://api.github.com/users/' + username;
    
}